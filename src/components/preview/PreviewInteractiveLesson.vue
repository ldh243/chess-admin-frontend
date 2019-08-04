<template>
  <v-layout wrap>
    <v-flex xs5 pr-7 offset-xs1>
      <Chessboard :fen="currentFen" :move="move" @onMove="showInfo" />
    </v-flex>
    <v-flex xs5 class="left-chess-info mx-auto">
      <v-card-text class="pr-5 pt-0 pb-0 pl-0" style="position:relative">
        <div class="move-history-content">
          <div v-for="(moved1, index) in moveHistory" :key="index">
            <template v-if="moved1.depth === 1">
              <div class="index">{{ moved1.index }}</div>
              <div
                v-if="moved1.whiteMove"
                :id="moved1.whiteMove.id"
                :preId="moved1.whiteMove.preId"
                :nextId="moved1.whiteMove.nextId"
                :preFen="moved1.whiteMove.preFen"
                :move="moved1.whiteMove.moveDirection"
                :class="moved1.whiteMove.class"
                :depth="moved1.depth"
                @click="loadFen(null, $event, moved1.whiteMove.content)"
              >{{ moved1.whiteMove.move }}</div>

              <div
                v-if="moved1.blackMove"
                :id="moved1.blackMove.id"
                :preId="moved1.blackMove.preId"
                :nextId="moved1.blackMove.nextId"
                :class="moved1.blackMove.class"
                :preFen="moved1.blackMove.preFen"
                :move="moved1.blackMove.moveDirection"
                :depth="moved1.depth"
                @click="loadFen(null, $event, moved1.blackMove.content)"
              >{{ moved1.blackMove.move }}</div>
            </template>
            <div v-if="moved1.depth === 2" class="depth_2">
              <template v-for="(moved2, index2) in moved1.moveHistory">
                <div v-if="moved2.depth === 2" :key="index2">
                  <div class="index">{{ moved2.index }}</div>
                  <div
                    v-if="moved2.whiteMove"
                    :id="moved2.whiteMove.id"
                    :preId="moved2.whiteMove.preId"
                    :nextId="moved2.whiteMove.nextId"
                    :class="moved2.whiteMove.class"
                    :preFen="moved2.whiteMove.preFen"
                    :move="moved2.whiteMove.moveDirection"
                    :depth="moved2.depth"
                    @click="
                              loadFen(null, $event, moved2.whiteMove.content)
                            "
                  >{{ moved2.whiteMove.move }}</div>
                  <div
                    v-if="moved2.blackMove"
                    :id="moved2.blackMove.id"
                    :preId="moved2.blackMove.preId"
                    :nextId="moved2.blackMove.nextId"
                    :class="moved2.blackMove.class"
                    :preFen="moved2.blackMove.preFen"
                    :move="moved2.blackMove.moveDirection"
                    :depth="moved2.depth"
                    @click="
                              loadFen(null, $event, moved2.blackMove.content)
                            "
                  >{{ moved2.blackMove.move }}</div>
                </div>
                <div v-if="moved2.depth === 3" :key="index2" class="depth_3">
                  <template v-for="(moved3, index3) in moved2.moveHistory">
                    <div :key="index3" class="index">{{ moved3.index }}</div>
                    <div
                      v-if="moved3.whiteMove"
                      :id="moved3.whiteMove.id"
                      :key="index3"
                      :preId="moved3.whiteMove.preId"
                      :nextId="moved3.whiteMove.nextId"
                      :class="moved3.whiteMove.class"
                      :preFen="moved3.whiteMove.preFen"
                      :move="moved3.whiteMove.moveDirection"
                      :depth="moved3.depth"
                      @click="
                                loadFen(null, $event, moved3.whiteMove.content)
                              "
                    >{{ moved3.whiteMove.move }}</div>
                    <div
                      v-if="moved3.blackMove"
                      :id="moved3.blackMove.id"
                      :key="index3"
                      :preId="moved3.blackMove.preId"
                      :nextId="moved3.blackMove.nextId"
                      :class="moved3.blackMove.class"
                      :preFen="moved3.blackMove.preFen"
                      :move="moved3.blackMove.moveDirection"
                      :depth="moved3.depth"
                      @click="
                                loadFen(null, $event, moved3.blackMove.content)
                              "
                    >{{ moved3.blackMove.move }}</div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="review-move-btn-group content-area">
          <v-btn @click="turnToFirstMove" text>
            <v-icon text>fast_rewind</v-icon>
          </v-btn>
          <v-btn @click="turnToPreviousMove" text>
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn @click="turnToNextMove" text>
            <v-icon>skip_next</v-icon>
          </v-btn>
          <v-btn @click="turnToLastMove" text>
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </div>
        <div class="move-information mt-3 content-area"></div>
      </v-card-text>
    </v-flex>
  </v-layout>
</template>

<script>
import Chessboard from '@/components/plugins/vue-chessboard'
export default {
  components: {
    Chessboard
  },
  props: {
    steps: {
      type: Array,
      default: []
    },
    initFen: {
        type: String,
        default: ''
    }
  },
  watch: {
    moveHistory: function(newHis) {
      this.moveHistory = newHis
        this.convertListToDisplay()
    }
  },
  data() {
    return {
        defaultFen: '',
      currentFen: '',
      move: '',
    firstId: 0,
    moveHistory: []
    }
  },
  methods: {
    convertListToDisplay() {
        this.defaultFen = this.initFen
        this.currentFen = this.defaultFen
        this.firstId = this.steps[0].id
        this.loadMoveHistoryByLesson()
    },
    refactorPreviousFen() {
      this.steps.forEach(el => {
        el.class = 'move'
        const parent = this.steps.find(pr => pr.id === el.preId)
        if (this.isEmpty(parent)) {
          el.preFen = this.initCode
        } else {
          el.preFen = parent.fen
        }
      })
      this.steps[0].fen = this.initCode
    },
    loadMoveHistoryByLesson() {
      this.loadFen(this.initCode)
      this.refactorPreviousFen()
      const firstStep = this.steps[0]
      this.dfs(null, firstStep, 1)
      this.refactorDepth2()
      this.refactorDepth3()
    },
    dfs(parent, move, depth) {
      if (depth === 2) {
        if (this.isEmpty(parent.depth2)) {
          parent.depth2 = []
        }
        parent.depth2.push(move)
      } else if (depth === 3) {
        if (this.isEmpty(parent.depth3)) {
          parent.depth3 = []
        }
        parent.depth3.push(move)
      }
      // move.move = `${move.move} ${depth}`
      this.addMoveHistory(move, depth)
      let index = depth - 1
      let firstBranch = null
      this.steps.forEach(el => {
        if (el.preId === move.id) {
          index++
          if (this.isEmpty(move.nextId)) {
            move.nextId = el.id
          }
          if (index === depth) {
            this.dfs(parent, el, index)
            firstBranch = el
          } else {
            this.dfs(firstBranch, el, index)
          }
        }
      })
    },
    refactorDepth2() {
      let queue = []
      for (let index = 0; index < this.moveHistory.length; index++) {
        const el = this.moveHistory[index]
        if (el.depth === 1) {
          if (
            !this.isEmpty(el.whiteMove) &&
            !this.isEmpty(el.whiteMove.depth2)
          ) {
            const newMove = {
              index: el.index,
              whiteMove: {
                move: '...',
                nextId: null,
                preId: null,
                class: 'empty-move'
              },
              blackMove: el.blackMove,
              depth: 1
            }
            el.whiteMove.class = 'move single-move-white'
            queue.push({ index: el.index, move: el.whiteMove, pos: index + 1 })
            queue.push({ oldMove: el, newMove: newMove, pos: index + 1 })
          }
          if (
            !this.isEmpty(el.blackMove) &&
            !this.isEmpty(el.blackMove.depth2)
          ) {
            const oddMove = {
              move: '...',
              nextId: null,
              preId: null,
              class: 'empty-move'
            }
            el.blackMove.depth2.unshift(oddMove)
            queue.push({ index: el.index, move: el.blackMove, pos: index + 1 })
          }
        }
      }
      while (queue.length > 0) {
        const el = queue.pop()
        if (this.isEmpty(el.index)) {
          el.oldMove.blackMove = null
          this.moveHistory.splice(el.pos, 0, el.newMove)
        } else {
          const depth2 = {
            depth: 2,
            moveHistory: []
          }
          el.move.depth2.forEach(childStep => {
            const newTurn = {
              index: el.index + depth2.moveHistory.length,
              whiteMove: childStep,
              blackMove: null,
              depth: 2
            }
            const turn = this.getTurnOfFen(childStep.preFen)
            if (turn === 'w') {
              newTurn.whiteMove.class = 'move single-move-white'
              depth2.moveHistory.push(newTurn)
            } else {
              let lastMove = depth2.moveHistory[depth2.moveHistory.length - 1]
              lastMove.whiteMove.class = 'move'
              if (lastMove.whiteMove.move === '...') {
                lastMove.whiteMove.class = 'empty-move'
              }
              lastMove.blackMove = childStep
            }
          })
          this.moveHistory.splice(el.pos, 0, depth2)
        }
      }
    },
    refactorDepth3() {
      let queue = []
      this.moveHistory.forEach(el => {
        if (el.depth === 2) {
          const listDepth2 = el.moveHistory
          listDepth2.forEach((moved2, pos) => {
            if (
              !this.isEmpty(moved2.whiteMove) &&
              !this.isEmpty(moved2.whiteMove.depth3)
            ) {
              const newMove = {
                index: moved2.index,
                whiteMove: {
                  move: '...',
                  nextId: null,
                  preId: null,
                  class: 'empty-move'
                },
                blackMove: moved2.blackMove,
                depth: 2
              }
              moved2.whiteMove.class = 'move single-move-white'
              queue.push({
                index: moved2.index,
                move: moved2.whiteMove,
                pos: pos + 1,
                list: listDepth2
              })
              queue.push({
                oldMove: moved2,
                newMove: newMove,
                pos: pos + 1,
                list: listDepth2
              })
            }
            if (
              !this.isEmpty(moved2.blackMove) &&
              !this.isEmpty(moved2.blackMove.depth3)
            ) {
              const oddMove = {
                move: '...',
                nextId: null,
                preId: null,
                class: 'empty-move'
              }
              moved2.blackMove.depth3.unshift(oddMove)
              queue.push({
                index: moved2.index,
                move: moved2.blackMove,
                pos: pos + 1,
                list: listDepth2
              })
            }
          })
        }
      })
      while (queue.length > 0) {
        const el = queue.pop()
        if (this.isEmpty(el.index)) {
          el.oldMove.blackMove = null
          el.list.splice(el.pos, 0, el.newMove)
        } else {
          const depth3 = {
            depth: 3,
            moveHistory: []
          }
          el.move.depth3.forEach(childStep => {
            const newTurn = {
              index: el.index + depth3.moveHistory.length,
              whiteMove: childStep,
              blackMove: null,
              depth: 2
            }
            const turn = this.getTurnOfFen(childStep.preFen)
            if (turn === 'w') {
              newTurn.whiteMove.class = 'move single-move-white'
              depth3.moveHistory.push(newTurn)
            } else {
              let lastMove = depth3.moveHistory[depth3.moveHistory.length - 1]
              lastMove.whiteMove.class = 'move'
              if (lastMove.whiteMove.move === '...') {
                lastMove.whiteMove.class = 'empty-move'
              }
              lastMove.blackMove = childStep
            }
          })
          el.list.splice(el.pos, 0, depth3)
        }
      }
    },
    showInfo(data) {
      console.log(data.history[data.history.length - 1])
      console.log(data.fen)
    },
    loadFen(fen, event, content) {
      if (event != undefined) {
        const divTarget = event.srcElement
        if (divTarget.id) {
          this.stepContent = content
          this.currentId = divTarget.id
          this.currentFen = divTarget.getAttribute('preFen')
          this.move = divTarget.getAttribute('move')
          this.setCurrentMove()
        }
      } else {
        this.currentFen = fen
      }
    },
    setCurrentMove() {
      //set highlight div dựa trên this.current id hiện tại
      let arr = document.getElementsByClassName('move')
      if (arr != undefined && arr != null && arr.length !== 0) {
        Array.prototype.forEach.call(arr, function(move) {
          move.classList.remove('current-move')
        })
        let currentMove = document.getElementById(this.currentId)
        if (!this.isEmpty(currentMove)) {
          currentMove.classList.add('current-move')
          // document.getElementsByClassName('move-history-content')[0].scrollTop =
          //   currentMove.offsetTop - 251
        }
      }
    },
    getPreMoveById(id) {
      const preId = document.getElementById(id).getAttribute('preId')
      return document.getElementById(preId)
    },
    getNextMoveById(id) {
      let nextId = null
      if (id === 0) {
        nextId = this.firstId
      } else {
        nextId = document.getElementById(id).getAttribute('nextId')
      }
      return document.getElementById(nextId)
    },
    getLastMoveById(id) {
      const nextStep = this.steps.find(el => el.id == id)
      if (this.isEmpty(nextStep.nextId)) {
        return document.getElementById(nextStep.id)
      }
      return this.getLastMoveById(nextStep.nextId)
    },
    turnToNextMove() {
      const nextMove = this.getNextMoveById(this.currentId)
      if (!this.isEmpty(nextMove)) {
        this.currentId = nextMove.id
        nextMove.click()
        this.setCurrentMove()
      }
    },
    turnToLastMove() {
      if (this.currentId === 0) {
        this.currentId = this.firstId
      }
      const lastMove = this.getLastMoveById(this.currentId)
      if (!this.isEmpty(lastMove)) {
        this.currentId = lastMove.id
        lastMove.click()
        this.setCurrentMove()
      }
    },
    turnToPreviousMove() {
      const preMove = this.getPreMoveById(this.currentId)
      if (!this.isEmpty(preMove)) {
        this.currentId--
        preMove.click()
        this.setCurrentMove()
      }
    },
    turnToFirstMove() {
      this.currentId = 0
      this.currentFen = this.defaultFen
      this.setCurrentMove()
    }
  },
  created() {
      this.convertListToDisplay()
  }
}
</script>

<style src="@/assets/style/chessboard.css">
</style>
