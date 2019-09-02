<template>
  <div>
    <v-container class="px-6 py-0">
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-form ref="form" v-model="exerciseForm" lazy-validation>
            <v-layout wrap>
              <v-flex xs6>
                <v-layout wrap>
                  <v-flex xs5 class="left-chess-info">
                    <v-text-field
                      color="blue-grey darken-1"
                      v-model="exerciseName"
                      :rules="nameRules"
                      label="Tên bài học"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs7 pl-1>
                    <v-text-field
                      color="blue-grey darken-1"
                      v-model="exerciseQues"
                      label="Câu hỏi"
                      :rules="questionRules"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      v-model="exerciseDes"
                      :rules="descriptionRules"
                      :rows="2"
                      color="grey darken-2"
                      label="Mô tả:  "
                    ></v-textarea>
                  </v-flex>
                  <v-flex xs12>
                    <v-tabs vertical color="amber" v-model="answersTabModel">
                      <v-tab
                        :disabled="checkboxChessbot"
                        v-for="(item,i) in 3"
                        :key="i"
                        class="mr-2"
                        :value="i"
                        @click="changeTab(i)"
                      >Đáp án</v-tab>
                      <v-tab-item :disabled="checkboxChessbot" v-for="(item,i) in 3" :key="i">
                        <v-flex xs12>
                          <div class="move-history-content mt-2">
                            <div v-for="(item, index) in moveHistory" :key="index">
                              <div class="index">{{ item.index }}</div>
                              <div
                                :id="`ex-move-${item.whiteMove.id}`"
                                :preId="item.whiteMove.preId"
                                :nextId="item.whiteMove.nextId"
                                :preFen="item.whiteMove.preFen"
                                :fen="item.whiteMove.fen"
                                :rightResponse="item.whiteMove.rightResponse"
                                :wrongResponse="item.whiteMove.wrongResponse"
                                :move="item.whiteMove.moveDirection"
                                :class="`ex-${item.whiteMove.class}`"
                                @click="loadFen(null, $event)"
                              >{{ item.whiteMove.move }}</div>
                              <div
                                v-if="item.blackMove"
                                :id="`ex-move-${item.blackMove.id}`"
                                :preId="item.blackMove.preId"
                                :nextId="item.blackMove.nextId"
                                :preFen="item.blackMove.preFen"
                                :fen="item.blackMove.fen"
                                :rightResponse="item.blackMove.rightResponse"
                                :wrongResponse="item.blackMove.wrongResponse"
                                :move="item.blackMove.moveDirection"
                                :class="`ex-${item.blackMove.class}`"
                                @click="loadFen(null, $event)"
                              >{{ item.blackMove.move }}</div>
                            </div>
                          </div>
                          <v-text-field
                            v-model="moveRightRes"
                            color="blue-grey darken-1"
                            label="Thực hiện đúng"
                            class="mt-3 answer-response"
                            hide-details
                            :disabled="checkboxChessbot || currentClickedMoveTurn !== orientation"
                            :append-icon="isSavedRightRes ? 'check_circle' : ''"
                            @keydown="isSavedRightRes = false"
                            @keyup="saveRightRes"
                          ></v-text-field>
                          <v-text-field
                            v-model="moveWrongRes"
                            color="blue-grey darken-1"
                            label="Thực hiện sai"
                            class="mt-3 answer-response"
                            hide-details
                            :disabled="checkboxChessbot || currentClickedMoveTurn !== orientation"
                            :append-icon="isSavedWrongRes ? 'check_circle' : ''"
                            @keydown="isSavedWrongRes = false"
                            @keyup="saveWrongRes"
                          ></v-text-field>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              @click="resetBoard"
                              color="blue-grey"
                              depressed
                              class="white--text"
                            >Xóa toàn bộ</v-btn>
                          </v-card-actions>
                        </v-flex>
                      </v-tab-item>
                    </v-tabs>
                    <v-checkbox
                      color="amber darken-2"
                      v-model="checkboxChessbot"
                      :label="'Sử dụng chế độ đánh tự động'"
                    ></v-checkbox>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs5 pl-10 style="margin: auto; position:relative">
                <Chessboard
                  :reset="isReset"
                  :orientation="orientation"
                  :fen="fen"
                  :boardName="'exerciseBoard'"
                  @onMove="showInfo"
                />
              </v-flex>
              <v-flex xs1 style="display:flex">
                <v-layout justify-center column>
                  <v-btn
                    style="margin:auto"
                    @click="editFenDialog = true"
                    fab
                    icon
                    text
                    small
                    color="grey darken-3"
                  >
                    <v-icon>fa-pen</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
        </v-window-item>
        <v-window-item :value="2">
          <PreviewExercise
            :question="exerciseQues"
            :specificAns="answersTab"
            :exercise="exerciseContent"
          />
        </v-window-item>
      </v-window>
      <v-layout wrap>
        <v-flex xs11>
          <v-card-actions class="py-0">
            <v-spacer></v-spacer>
            <v-btn :disabled="step === 1" @click="removeExercise">Trở về</v-btn>
            <v-btn
              :disabled="!isValidated"
              @click="step === 1 ? prepareExercise() : saveExercise()"
            >{{step === 1 ? 'Xem trước' : 'Lưu'}}</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="editFenDialog" persistent max-width="870px">
      <v-card :elevation="8">
        <v-toolbar :elevation="0" color="grey lighten-3">
          <v-toolbar-title class="grey--text text--darken-3">Tạo thế cờ</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="editFenDialog = false"
            class="btn-create-puzzle text-xs-center"
            text
            icon
            color="grey darken-3"
            dark
            depressed
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container class="py-3 px-5">
          <v-flex xs12>
            <create-chess-puzzle
              @onChangeFen="getFen"
              :resetBoard="isReset"
              :boardName="'exerciseCreateBoard'"
            ></create-chess-puzzle>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editMoveDialog" persistent max-width="500">
      <v-card>
        <v-card-actions>
          <v-card-title class="headline">Nước cờ mới</v-card-title>
          <v-spacer></v-spacer>
          <v-btn color="grey" small @click="closeEditMoveDialog" fab icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>"Thêm nước khác" để thêm nước đi khác vào ván cờ hiện tại. Nếu "Thay đổi" nước đi, các nước sau đó sẽ bị xóa</v-card-text>
        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn color="amber darken-1" class="white--text" depressed @click="editMove">Thay đổi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" top :timeout="3000">
      {{snackbarContent}}
      <v-btn icon fab @click="snackbar = false">
        <v-icon>Đóng</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard/index.vue'
import CreateChessPuzzle from './CreateChessPuzzle.vue'
import PreviewExercise from './preview/PreviewExercise.vue'
import { RepositoryFactory } from '@/repository/RepositoryFactory'
const lessonRepository = RepositoryFactory.get('lesson')
import MoveHistory from '@/library/ChessHistory.js'
export default {
  name: 'CreateExercise',
  components: {
    Chessboard,
    CreateChessPuzzle,
    PreviewExercise
  },
  props: {
    editingLessonId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      exerciseForm: true,
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      defaultFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      editFenDialog: false,
      initFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      emptyFen: '8/8/8/8/8/8/8/8',
      snackbar: false,
      snackbarContent: '',
      window: 0,
      checkboxChessbot: false,
      step: 1,
      moveHistory: [],
      moveHistories: [[], [], []],
      answersTabModel: 0,
      answersTab: 0,
      totalMove: 0,
      currentMove: 0,
      currentIndexMoveInArr: -1,
      totalIndexMove: 0,
      isSavedRightRes: false,
      isSavedWrongRes: false,
      moveRightRes: '',
      moveWrongRes: '',
      orientation: 'white',
      nextMoveTurn: 'white',
      currentClickedMoveTurn: '',
      isReset: false,
      isValidated: false,
      exerciseName: '',
      exerciseDes: '',
      exerciseQues: '',
      nameRules: [
        v => !!v || 'Tên bài học không được để trống',
        v => (v && v.length > 6) || 'Tên bài học phải nhiều hơn 6 kí tự'
      ],
      descriptionRules: [v => !!v || 'Mô tả bài học không được để trống'],
      questionRules: [v => !!v || 'Câu hỏi không được để trống'],
      isContainMove: false,
      exerciseContent: {},
      answerArr: [[], [], []],
      preId: null,
      exerciseId: -1,
      isEditing: false,
      lastMove: 0,
      editMoveDialog: false,
      moveData: null,
      editMove: false,
      closeEditMoveDialog: false
    }
  },
  updated() {
    if (this.currentMove > 0) {
      this.setCurrentMove()
    }
  },
  created() {
    this.answersTab = 0
    if (this.editingLessonId > 0) {
      this.getById(this.editingLessonId)
      this.isEditing = true
    }
    this.moveHistory = this.moveHistories[this.answersTab]
    this.baywatch(
      [
        'moveHistory',
        'exerciseDes',
        'exerciseQues',
        'exerciseName',
        'checkboxChessbot'
      ],
      this.checkPreviewButton.bind(this)
    )
    this.currentClickedMoveTurn = 'white'
  },
  methods: {
    replaceMove() {},
    baywatch: function(props, watcher) {
      var iterator = function(prop) {
        this.$watch(prop, watcher)
      }
      props.forEach(iterator, this)
    },
    checkPreviewButton() {
      let ableArr = this.answerArr.filter(moveArr => {
        return moveArr.length > 0
      })
      console.log('move his change')
      this.isValidated =
        (ableArr.length > 0 || this.checkboxChessbot) &&
        this.$refs.form.validate()
      console.log(this.isValidated)
    },
    getFen(data) {
      if (
        data['fen'] !== undefined &&
        data['fen'].split(' ')[0] !== this.emptyFen
      ) {
        this.removeHighlightForBoard('exerciseBoard')
        this.chessboardData = data
        this.editFenDialog = false
        this.fen = this.chessboardData.fen
        this.initFen = this.chessboardData.fen
        this.orientation = this.chessboardData.orientation
      } else {
        this.editFenDialog = false
        this.snackbarContent = 'Thế cờ không hợp lệ'
        this.snackbar = true
      }
    },
    loadFen(fen, event) {
      if (event != undefined) {
        const divTarget = event.srcElement
        if (divTarget.id) {
          this.currentId = divTarget.id.replace('ex-move-', '')
          this.currentMove = this.currentId
          console.log(this.currentMove)
          this.preId = parseInt(this.currentMove)
          if (this.currentMove == 1) {
            this.fen = document
              .getElementById(`ex-move-${divTarget.getAttribute('nextId')}`)
              .getAttribute('preFen')
          } else {
            this.fen = divTarget.getAttribute('fen')
          }
          this.currentClickedMoveTurn = divTarget.getAttribute('preFen').split(' ')[1] === 'w' ? 'white' : 'black'
          this.move = divTarget.getAttribute('move')
          this.moveRightRes = divTarget.getAttribute('rightResponse')
          this.moveWrongRes = divTarget.getAttribute('wrongResponse')
          this.setCurrentMove()
        }
      } else {
        this.fen = fen
      }
    },
    showInfo(data) {
      this.moveData = data
      this.currentClickedMoveTurn = data.turn === 'white' ? 'black' : 'white'
      if (this.currentMove == this.lastMove) {
        this.totalMove++
        let newHalfMove = {
          id: this.totalMove,
          fen: data.fen,
          move: data.move,
          moveDirection: data.moveDirection,
          preId: this.preId,
          rightResponse: '',
          wrongResponse: ''
        }
        this.preId = this.totalMove
        this.moveWrongRes = ''
        this.moveRightRes = ''
        this.answerArr[this.answersTab].push(newHalfMove)
        this.currentMove = this.totalMove
        this.lastMove = this.currentMove
      } else {
      }
      console.log(this.answerArr[this.answersTab])
      this.moveHistory = this.loadMoveHistory(this.answerArr[this.answersTab])
    },
    loadMoveHistory(answer) {
      let lessonDetails = {
        interactiveLesson: {
          initCode: this.initFen,
          steps: answer.map(e => ({ ...e }))
        }
      }
      this.moveHistoryObj = new MoveHistory(lessonDetails)
      this.moveHistoryObj.formatMoveHistory()
      return this.moveHistoryObj.getMoveHistory
    },
    setCurrentMove() {
      let arr = document.getElementsByClassName('ex-move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('ex-current-move')
        })
        let currentMove = document.getElementById(`ex-move-${this.currentMove}`)
        currentMove.classList.add('ex-current-move')
        // currentMove.parentNode.parentNode.scrollTop = currentMove.offsetTop
      }
    },
    prepareExercise() {
      console.log('prepare')
      if (this.checkboxChessbot) {
        this.exerciseContent = {
          fen: this.initFen,
          answerType: 1
        }
      } else {
        this.answerArr = this.answerArr.filter(moveArr => {
          return moveArr.length > 0
        })
        this.exerciseContent = {
          fen: this.initFen,
          answerType: 2,
          answerArr: this.answerArr
        }
      }
      this.step++
      console.log(this.exerciseContent)
    },
    removeExercise() {
      this.exercise = {
        question: '',
        fen: '',
        answers: []
      }
      this.step--
    },
    saveRightRes() {
      let timeout = window.setTimeout(() => {
        console.log(this.answerArr)
        console.log(this.currentMove)
        let halfMove = this.answerArr[this.answersTab].find(move => {
          return move.id == this.currentMove
        })
        halfMove.rightResponse = this.moveRightRes
        this.isSavedRightRes = true
        this.moveHistory = this.loadMoveHistory(this.answerArr[this.answersTab])
      }, 500)
    },
    saveWrongRes() {
      let timeout = window.setTimeout(() => {
        let halfMove = this.answerArr[this.answersTab].find(move => {
          return move.id == this.currentMove
        })
        halfMove.wrongResponse = this.moveWrongRes
        this.isSavedWrongRes = true
        this.moveHistory = this.loadMoveHistory(this.answerArr[this.answersTab])
      }, 500)
    },
    resetBoard() {
      // this.isReset = true
      // this.fen = this.defaultFen
      // this.moveHistories = [[], [], []]
      // this.orientation = this.nextMoveTurn = 'white'
      // this.totalMove = this.currentMove = 0
      // this.currentIndexMoveInArr = -1
      // this.totalIndexMove = 0
      // this.isSavedRightRes = this.isSavedWrongRes = false
      // this.initFen = this.fen = this.defaultFen
      // this.answersTabModel = 0
      // this.answersTab = 0
      // this.moveRightRes = this.moveWrongRes = ''
      // this.currentClickedMoveTurn = ''
    },
    changeTab(index) {
      this.answersTab = index
      if (this.answerArr[this.answersTab].length > 0) {
        this.moveHistory = this.loadMoveHistory(this.answerArr[this.answersTab])
        this.currentMove = parseInt(this.answerArr[this.answersTab][this.answerArr[this.answersTab].length - 1].id)
        this.lastMove = this.currentMove
      } else {
        this.moveHistory = []
        this.currentMove = 0
        this.lastMove = 0
      }
    },
    saveExercise() {
      if (this.$refs.form.validate()) {
        const exercise = {
          name: this.exerciseName,
          description: this.exerciseDes,
          exercise: {
            question: this.exerciseQues,
            answer: this.exerciseContent
          }
        }
        if (this.editingLessonId > 0) {
          exercise.exercise['exerciseId'] = this.exerciseId
          this.$emit('onUpdateExercise', exercise)
        } else {
          console.log(exercise)
          this.$emit('onAddExercise', exercise)
        }
      }
    },
    convertMoveHistory(answerArr) {},
    async getById(lessonId) {
      const data = await lessonRepository.getById(lessonId).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.puzzle-content,
.move-history-content {
  border-radius: 4px;
  /* border: 1px solid #ccc; */
}
.puzzle-color {
  height: 40px;
}
.move-history-content {
  height: 120px;
}
.move-answer {
  background-color: rgba(255, 179, 25, 0.07);
}
.v-expansion-panel::before {
  /* box-shadow: none; */
}
.v-expansion-panel-content__wrap {
  padding: 0 0px 0px !important;
}
</style>
<style>
.answer-response i {
  color: green !important;
}
</style>
<style src="@/assets/style/chessboard.css"></style>