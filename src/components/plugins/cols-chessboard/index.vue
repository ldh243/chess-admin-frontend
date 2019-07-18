<template>
        <div :id="boardName">
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
            default: 'white'
        },
        sparePieces: {
            type: Boolean,
            default: false
        },
        boardName: {
            type: String,
            default: 'board'
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
            this.board.position(this.fen)
            this.game.load(this.fen)
        },
        orientation: function(orientation) {
            console.log("change orientation")
            this.orientation = orientation
            this.board.orientation(this.orientation)
        }
    },
    methods: {
        getPosition(oldPos, newPos) {
            let data = {}
            if (ChessBoard.objToFen(newPos) !== undefined) {
                data['object'] = newPos
                data['fen'] = ChessBoard.objToFen(newPos)
                this.$emit('onChangePiece', data)
            }
        },
        getMove(source, target, piece, newPos, oldPos, orientation) {
            let data = {}
            let moves = this.game.moves({ verbose: true })
            if (moves.includes({from: source, to: target})) {
                console.log('ahihi')
                this.game.move({from: source, to: target})
            }
            data['moveDirection'] = `${source}${target}`
            data['move'] = `${piece.charAt(1) === 'P' ? '' : piece.charAt(1)}${target}`
            this.$emit('onMove', data)
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
                onDrop: !this.sparePieces ? this.getMove : '',
                pieceTheme: '/assets/chesspieces/wikipedia/{piece}.png'
            }
            this.board = ChessBoard(this.boardName, cfg)
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
