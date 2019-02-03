const fs = require('fs')

let instance;
class Data {
    constructor() {
        this.data = []
        this.set = {}
        this.minLength = 3
        this.generate()
    }

    async populate() {
        return new Promise((resolve, reject) => {
            fs.readFile('./data.csv', (err, data) => {
                if(err) reject(err)
                let names = data.toString().split('\n')
                names.shift()
                names = names.map(n => n.split(',').join('$'))
                this.data = names
                resolve()
            })
        })
    }

    async generate() {
        return new Promise((resolve, reject) => {
            this.populate().then(() => {
                for(let i = 0; i < this.data.length; i++) {
                    let d = this.data[i]
                    for(let j = this.minLength; j < d.length; j++){
                        this.addToSet(i, d, j)
                    }
                }
            })
        })
    }

    addToSet(id, string, l) {
        string = string.replace(/\$/g, '').toLowerCase()
        for(let i = 0; i < string.length - l + 1; i++) {
            let sub = string.slice(i, i + l)
            if(this.set[sub]) {
                this.set[sub].push([id, this.calculateScore(string, sub)])
            } else {
                this.set[sub] = [[id, this.calculateScore(string, sub)]]
            }
        }
    }

    async search(query) {
        if(!this.data) await this.generate()
        query = query.replace(/[^A-za-z]+/g, '').replace(/\^+/g, '').toLowerCase()
        const max = query.length < 10 ? query.length : 10
        let results = {}
        let nearest = this.set[query]
        nearest && nearest.forEach(n => {
            if(results[n[0]]){
                results[n[0]].push(n[1])
            } else {
                results[n[0]] = [n[1]]
            }
        })
        // for(let i = 0; i < max - this.minLength + 1; i++){
        //     console.log(query.slice(i, i + this.minLength))
        //     let nearest = this.set[query.slice(i, i + this.minLength)]
        //     nearest && nearest.forEach(n => {
        //         if(results[n[0]]){
        //             results[n[0]].push(n[1])
        //         } else {
        //             results[n[0]] = [n[1]]
        //         }
        //     })
        // }
        
        let data = Object.entries(results).map(n => {
            return {
                value: this.data[n[0]].replace(/\$/g, ' '),
                score: n[1].reduce((prev, current) => {
                    return prev + current
                }) * n[1].length
            }
        })
        return { data: data.sort((a, b) => b.score - a.score) }
    }

    calculateScore(string, sub) {
        /*
            factors: 
            1. Closeness to 0th index
            2. Length of substring
        */
        return Math.round((((string.length - string.indexOf(sub)) / string.length) * (sub.length / string.length)) * 100) / 100
    }

    getSetSize(){
        return Object.keys(this.set).length
    }
}

module.exports = () => {
    if(instance) return instance
    else {
        instance = new Data()
        return instance
    }
}

