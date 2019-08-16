<template>
  <v-layout wrap>
    <v-flex xs5 pr-7 offset-xs1>
      <Chessboard :fen="exercise.fen" :move="autoMove" :orientation="orientation" @onMove="checkMove" />
    </v-flex>
    <v-flex xs5 class="left-chess-info mx-auto">
      <v-card-text class="pr-5 pt-0 pb-0 pl-0" style="position:relative">
        <div class="move-history-content mt-2">
          <div v-for="(item, index) in moveHistory" :key="index">
            <div class="index">{{ item.index }}</div>
            <div
              :id="`move-${item.whiteMove.moveCount}`"
              class="move"
              @click="loadFen(item.whiteMove.fen, item.whiteMove.moveCount, index, 'white')"
            >{{ item.whiteMove.move }}</div>
            <div
              v-if="item.blackMove"
              :id="`move-${item.blackMove.moveCount}`"
              class="move"
              @click="loadFen(item.blackMove.fen, item.blackMove.moveCount, index, 'black')"
            >{{ item.blackMove.move }}</div>
          </div>
        </div>
        <div class="review-move-btn-group content-area">
          <v-btn text>
            <v-icon text>fast_rewind</v-icon>
          </v-btn>
          <v-btn text>
            <v-icon>skip_previous</v-icon>
          </v-btn>
          <v-btn text>
            <v-icon>skip_next</v-icon>
          </v-btn>
          <v-btn text>
            <v-icon>fast_forward</v-icon>
          </v-btn>
        </div>
        <div class="move-information mt-3 content-area">
          <div class="title pa-2 grey--text text--darken-3">{{exercise.question}}</div>
          <div v-for="(item, index) in logAnswer" :key="`log-${index}`">{{item}}</div>
        </div>
      </v-card-text>
    </v-flex>
  </v-layout>
</template>

<script>
import Chessboard from '@/components/plugins/cols-chessboard'
export default {
  components: {
    Chessboard
  },
  props: {
    exercise: {
      type: Object,
      default: null
    },
    orientation: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {
      moveHistory: [],
      isUsingBot: false,
      engine: {},
      fen: '',
      currentMoveIndexInArr: -1,
      firstMoveArr: [],
      currentMoveIndex: 1,
      answerList: [],
      logAnswer: [],
      predictPlayerAns: [],
      predictAutoMove: [],
      autoMove: ''
    }
  },
  watch: {
    // exercise: function(newEx) {
    //   this.exercise = newEx
    //   this.exercise.answers = this.exercise.answers.filter(arr => {
    //   return arr.length > 0
    // })
    // this.exercise.answers.foreach(arr => {
    //   if (this.orientation === 'white') {
    //     this.firstMoveArr.push(arr[0].whiteMove.move)
    //   }
    // })
    // }
  },
  updated() {
    console.log("updaed")
  this.exercise.answers = this.exercise.answers.filter(arr => {
      return arr.length > 0
    })
    if (this.exercise.answers.length > 1) {
      this.exercise.answers.foreach(arr => {
      if (this.orientation === 'white') {
        this.firstMoveArr.push(arr[0].whiteMove.move)
      }
    })
    } else {
      this.firstMoveArr.push(this.exercise.answers[0][0].whiteMove.move)
    }
    console.log(this.firstMoveArr)
  },
  methods: {
    sendUCI(str) {
      console.log(str)
      this.engine.postMessage(str)
    },
    checkMove(data) {
        this.callAutoMove()
    },
    callAutoMove() {
      this.autoMove = this.predictPlayerAns.filter(e => {
        return e === this.currentMoveIndex
      }).moveDirection
    },
    getBotMove() {
      // this.sendUCI("setoption name Skill Level value " + this.level);
      // console.log(this.moves);
      // this.sendUCI("position startpos moves" + this.moves);
      // this.sendUCI("go depth " + this.depth);
      this.engine.onmessage = function(event) {
        console.log(event.data)
        // let line = event.data;
        // if (event.data.indexOf("bestmove") > -1) {
        //   let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        //   match[3] == undefined
        //     ? (self.move = match[1] + match[2])
        //     : (self.move = match[1] + match[2] + match[3]);
        // }
      }
    }
  },
  created() {
    this.exercise.answers = this.exercise.answers.filter(arr => {
      return arr.length > 0
    })
    if (this.exercise.answers.length > 1) {
      this.exercise.answers.foreach(arr => {
      if (this.orientation === 'white') {
        this.firstMoveArr.push(arr[0].whiteMove.move)
      }
    })
    } else {
      this.firstMoveArr.push(this.exercise.answers[0][0].whiteMove.move)
    }
    console.log(this.firstMoveArr)
    // const stockfish = require("stockfish")
    // this.engine = stockfish();
    // this.sendUCI('uci')
    // this.sendUCI("setoption name Skill Level value 6");
    // this.sendUCI("position startpos moves");
  }
}
</script>
<style scoped>

</style>
<style src="@/assets/style/chessboard.css">
</style>

