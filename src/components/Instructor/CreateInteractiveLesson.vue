<template>
  <div>
    <v-card class="mt-3">
      <v-toolbar color="#E6E6E6">
        <v-text-field v-model="lessonViewModel.name" label="Bài Tập 1" single-line></v-text-field>
      </v-toolbar>
      <v-layout>
        <v-flex xs6 pr-4>
          <v-card-text>
            <v-flex class="move-history">
              <v-card-title>
                <span class="title font-weight-bold">Nước đi</span>
              </v-card-title>
              <div class="move-history-content">
                <div v-for="(item, index) in moveHistory" :key="index">
                  <div class="index">{{ item.id }}</div>
                  <div :id="item.id" class="move" @click="loadFen(item.fen, $event)">{{ item.move }}</div>
                  <div
                    v-if="item.blackMove"
                    :id="item.id"
                    class="move"
                    @click="loadFen(item.fen, $event)"
                  >{{ item.move }}</div>
                </div>
              </div>
            </v-flex>
          </v-card-text>
          <v-card-text>
            <v-textarea v-model="this.content" box label="Nội dung:  "></v-textarea>
            <v-btn color="blue-grey" class="white--text">Cập nhật</v-btn>
            <!-- <v-btn color="blue-grey" class="white--text">Xóa</v-btn> -->
          </v-card-text>
          <v-card-text>
            <v-card-title>
                <span class="title font-weight-bold">Thế cờ</span>
              </v-card-title>
            <div class="puzzle-content pa-3">
                <div><span class="heading font-weight-bold">White: </span>
                  <div class="piece-content mr-1" v-for="piece in whiteObj" :key="piece">{{piece}}</div>
                </div>
                <div><span class="heading font-weight-bold">Black: </span>
                  <div class="piece-content mr-1" v-for="piece in blackObj" :key="piece">{{piece}}</div>
                </div>
              </div>
            <v-btn
              @click="exampleChess(exampleFen,currentStep)"
              color="blue-grey"
              class="white--text"
            >Bắt Đầu</v-btn>
            <v-divider class="my-2"></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs6 pa-1 style="margin: auto">
          <v-layout row>
          <v-flex xs10>
            <Chessboard @onMove="showInfo" :fen="fen" :boardName="'board'" />
          </v-flex>
          <v-flex xs2 style="margin: auto">
        <v-btn @click="editBoard = true" flat icon fab color="grey">
          <v-icon>fa-pen</v-icon>
        </v-btn>
      </v-flex>
      </v-layout>
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" depressed>Xong</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="editBoard" persistent max-width="800px">
      <v-card>
        <v-toolbar card>
          <v-card-title>
          <span class="headline">Tạo thế cờ</span>
        </v-card-title>
        </v-toolbar>
        <v-container>
          <create-chess-puzzle @onChangeFen="getFen" :boardName="'createBoard'"></create-chess-puzzle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="editBoard = false" class="btn-create-puzzle text-xs-center"  flat color="blue darken-1">Đóng</v-btn>
            <v-btn @click="saveFen" class="btn-create-puzzle" depressed color="info">Lưu</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard'
import CreateChessPuzzle from '@/components/Instructor/CreateChessPuzzle.vue'

export default {
  components: {
    Chessboard,
    CreateChessPuzzle
  },
  data() {
    return {
      lessonViewModel: '',
      moveHistory: '',
      content: '',
      editBoard: false,
      fen: '',
      chessboardData: {},
      whiteObj: [],
      blackObj: []
    }
  },
  created() {
    
  },
  methods: {
    getFen(data) {
      this.chessboardData = data
    },
    saveFen() {
      this.fen = this.chessboardData.fen
      let posKey = Object.keys(this.chessboardData.object)
      this.whiteObj = []
      this.blackObj = []
      posKey.forEach(e => {
        let piece = this.chessboardData.object[e]
        if (piece.charAt(0) === 'w') {
          this.whiteObj.push(piece.charAt(1) + e)
        } else {
          this.blackObj.push(piece.charAt(1) + e)
        }
      })
      this.editBoard = false
    },
    showInfo(data) {
      console.log(data)
    }
    // turnToNextMove() {
    //   if (this.currentMove !== this.totalMove) {
    //     this.currentMove++
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // },
    // turnToLastMove() {
    //   if (this.currentMove !== this.totalMove) {
    //     this.currentMove = this.totalMove
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // },
    // turnToPreviousMove() {
    //   if (this.currentMove > 1) {
    //     this.currentMove--
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // },
    // turnToFirstMove() {
    //   if (this.currentMove > 1) {
    //     this.currentMove = 1
    //     const divTarget = this.getMoveByIdNumber()
    //     divTarget.click()
    //     this.updateMove = false
    //     this.setCurrentMove()
    //   }
    // },
    // turnToNextLesson() {
    //   if (this.activeLesson < this.lessons.length - 1) {
    //     this.activeLesson++
    //     this.loader = true
    //     this.resetBoardAndResetHistory()
    //     this.getLessonById()
    //     this.checkStatusDirectLesson()
    //     this.loader = false
    //   }
    // },
    // turnToPreviousLesson() {
    //   if (this.activeLesson >= 1) {
    //     this.activeLesson--
    //     this.loader = true
    //     this.resetBoardAndResetHistory()
    //     this.getLessonById()
    //     this.checkStatusDirectLesson()
    //     this.loader = false
    //   }
    // },
    // checkStatusDirectLesson() {
    //   this.statusNextLesson = this.checkStatusNextLesson()
    //   this.statusPreviousLesson = this.checkStatusPreviousLesson()
    // },
    // checkStatusNextLesson() {
    //   if (this.activeLesson === this.lessons.length - 1) {
    //     return true
    //   }
    //   return false
    // },
    // checkStatusPreviousLesson() {
    //   if (this.activeLesson <= 0) {
    //     return true
    //   }
    //   return false
    // },
  }
}
</script>

<style scoped src="@/assets/style/chessboard.css" >
>>> piece,
.blue {
  background-color: transparent !important;
}
</style>
