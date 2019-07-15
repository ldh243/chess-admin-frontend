<template>
    <div id="board">
    </div>
</template>

<script>
import Chess from 'chess.js'
require('./chessboard-0.3.0.js')
export default {
    name: 'ColsChessboard',
    props: {
        fen: {
            type: String,
            default: 'start'
        },
        orientation: {
            type: String,
            default: 'white'
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
        }
    },
    methods: {
        getPosition(oldPos, newPos) {
            if (ChessBoard.objToFen(newPos) !== undefined) {
                console.log(ChessBoard.objToFen(newPos))
                this.$emit('onChangePiece', ChessBoard.objToFen(newPos))
            }
        },
        loadPosition() {
            console.log(this.fen)
            this.game.load(this.fen)
            let cfg = {
                position: this.game.fen(),
                draggable: true,
                sparePieces: this.sparePieces,
                dropOffBoard: this.sparePieces ? 'trash' : 'snackback',
                orientation: this.orientation,
                onChange: this.getPosition
            }
            this.board = ChessBoard('board', cfg)
            console.log(this.board)
        }
    },
    mounted() {
        this.loadPosition()
        this.getPosition()
        console.log(this.board)
    },
    created() {
        this.game = new Chess()
        this.board = null
    }   
}
</script>

<style scoped>

</style>
