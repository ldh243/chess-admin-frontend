<template>
        <div id="board">
    </div>
</template>

<script>
import Chess from 'chess.js'
require('./chessboard-1.0.0.js')
export default {
    name: 'ColsChessboard',
    props: {
        fen: {
            type: String,
            default: 'start'
        },
        orientation: {
            type: String,
            default: 'black'
        },
        sparePieces: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            currentFen: ''
        }
    },
    watch: {
        fen: function(newFen) {
            this.fen = newFen
            this.loadPosition()
        },
        orientation: function(orientation) {
            console.log("change orientation")
            this.orientation = orientation
            // this.game.reset()
            // if (this.sparePieces) {
            //     this.currentFen = `8/8/8/8/8/8/8/8 ${this.orientation === 'white' ? 'w' : 'b'} KQkq - 0 1`
            // }
            this.board.orientation(this.orientation)
            // this.loadPosition()
        }
    },
    methods: {
        getPosition(oldPos, newPos) {
            let data = {}
            if (ChessBoard.objToFen(newPos) !== undefined) {
                console.log(ChessBoard.objToFen(newPos))
                this.$emit('onChangePiece', ChessBoard.objToFen(newPos))
            }
        },
        loadPosition() {
            this.game.load(this.currentFen)
            let cfg = {
                position: this.game.fen(),
                draggable: true,
                sparePieces: this.sparePieces,
                dropOffBoard: this.sparePieces ? 'trash' : 'snackback',
                orientation: this.orientation,
                onChange: this.getPosition,
                pieceTheme: '/assets/chesspieces/wikipedia/{piece}.png'
            }
            this.board = ChessBoard('board', cfg)
        }
    },
    mounted() {
        this.loadPosition()
    },
    created() {
        this.game = new Chess()
        this.board = null
        if (this.sparePieces) {
            this.currentFen = `8/8/8/8/8/8/8/8 ${this.orientation === 'white' ? 'w' : 'b'} KQkq - 0 1`
        }
    }   
}
</script>

<style scoped>

</style>
