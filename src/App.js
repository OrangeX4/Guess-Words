import { Card, message } from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
import ReactDOM from 'react-dom'
import React from 'react'

import './App.css'

let visible = false

const text = `cat
dog
wolf
frog
lion
apple
pear
peach
grape
red
yellow
white
black
rain
sun
snow
wind
east
table
chair
hate
ball
man
enjoy
grass
war
year
eat
breakfast
sweet
cold
hot
happy
angry
sad
crazy
hope
van
game
do
you
like
what
see
clap
sit
stand
run
basketball
football
walk
TV
fridge
computer
washer
cooker
cook
police
teacher
student
doctor
JK
bilibili
Lolita
miku!
math
energy
hard
fake
Chinese
read
sleep
deep
dark
fantasy
boy
next
door
dinasour
hentai
kawaii
orange
fly
flower
yamero
square
star
paper
AI
machine
learning
possibility
matrix
internet
rocket
Mickey
Donald
yysy
kksk
tql
orz
%%%
qwq
:-)
bug
screen
404
software
system
email
mouse
key
ZhihuaZhou
watermelon
Mary
sheep
fish
kiss
K.O.
OK
review
P2P
block
chain
time
-1s
btc
life
elder
glasses
tank
too
young
simple
somtimes
naive
dragon
555
number
2333333
qs
iron
bat
spider
super
hero
avenger
666
99
3.14159
circle
triangle
rectangle
pentagon
follow
debug
engineer
power
magic
money
captain
for
while
if
switch
program
code
website
NLP
CV
logic
language
c++
Java
Turing
CCF
Winnie`

const words = text.split('\n')

const data = []

for (let i = 0; i < 5; i++) {
    data.push([])
    for (let j = 0; j < 5; j++) {
        data[i].push({ word: 'none', color: 'black', origin: 'none' })
    }
}

function rand() { return Math.floor(Math.random() * 5) }

function getWord() { return words[Math.floor(Math.random() * words.length)] }

let greenX = rand()
let greenY = rand()


data[greenX][greenY].word = getWord()
data[greenX][greenY].origin = 'green'

let redCount = 0;

while (redCount < 12) {
    const x = rand()
    const y = rand()
    const newWord = getWord()

    let isDuplicated = false
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (data[i][j].word === newWord)
                isDuplicated = true
        }
    }

    if (data[x][y].origin === 'none' && !isDuplicated) {
        data[x][y].word = newWord
        data[x][y].origin = 'red'
        redCount++
    }
}

for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {

        const newWord = getWord()

        let isDuplicated = false

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (data[i][j].word === newWord)
                    isDuplicated = true
            }
        }

        if (!isDuplicated) {
            if (data[x][y].origin === 'none') {
                data[x][y].word = newWord
                data[x][y].origin = 'blue'
            }
        } else {
            y--
        }
    }
}

const color = {
    red: 'lightcoral',
    blue: 'lightskyblue',
    green: 'lightgreen'
}

function handleClick(row, col, color) {
    if (color === 'black') {
        data[row][col].color = data[row][col].origin
        ReactDOM.render(<React.StrictMode>
            <App />
        </React.StrictMode>, document.getElementById('root'));

        let redCount = 0
        let blueCount = 0

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if(data[i][j].color === 'red') redCount++
                if(data[i][j].color === 'blue') blueCount++
            }
        }

        if(12 - redCount === 0) {
            message.success('Red win!')
        } else if(12 - blueCount === 0) {
            message.success('Blue win!')
        }
        message.info(`There are ${12 - redCount} red items left and ${12 - blueCount} blue items left.`)
    }
}

function handleChange() {
    visible = !visible
    ReactDOM.render(<React.StrictMode>
        <App />
    </React.StrictMode>, document.getElementById('root'));
}

function Grid(props) {

    if (visible) {
        return (
            <Card onClick={() => { handleClick(props.row, props.col, props.color) }}
                hoverable={props.color === 'black'}
                style={{ color: props.color, backgroundColor: props.color === 'black' ? color[props.origin] : 'white' }}
                className="card-style">
                { props.children}
            </Card>
        )
    } else {
        return (
            <Card onClick={() => { handleClick(props.row, props.col, props.color) }}
                hoverable={props.color === 'black'}
                style={{ color: props.color, backgroundColor: 'white' }}
                className="card-style">
                { props.children}
            </Card>
        )
    }
}

function App() {
    return (
        <div>
            <div className="title">
                Guess Words
            </div>
            <div className="board">
                {data.map((line, row) => <div className="row">
                    {line.map((item, col) => <Grid color={item.color} origin={item.origin} row={row} col={col}>{item.word}</Grid>)}
                </div>)}
            </div>
            <Card onClick={handleChange} hoverable className="button"><RetweetOutlined style={{ fontSize: '32px' }} /></Card>
        </div>
    )
}

export default App;
