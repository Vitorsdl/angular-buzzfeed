import { Component, OnInit } from '@angular/core';
import quiz_questoes from "../../assets/data/quiz_questoes.json";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  titulo: string = ""

  questoes: any
  questaoSelecionada: any

  respostas: string[] = []
  respostaSelecionada: string = ""

  questaoIndex: number = 0
  questaoMaxIndex: number = 0

  finalizado: boolean = false

  constructor() { }

  ngOnInit(): void {
    if (quiz_questoes) {
      this.finalizado = false
      this.titulo = quiz_questoes.titulo

      this.questoes = quiz_questoes.questoes
      this.questaoSelecionada = this.questoes[this.questaoIndex]

      this.questaoIndex = 0
      this.questaoMaxIndex = this.questoes.length
    }
  }

  playerChoose(value: string) {
    this.respostas.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questaoIndex += 1

    if (this.questaoMaxIndex > this.questaoIndex) {
      this.questaoSelecionada = this.questoes[this.questaoIndex]
    } else {
      const respostaFinal:string = await this.checkResult(this.respostas)
      this.finalizado = true
      this.respostaSelecionada = quiz_questoes.resultados[respostaFinal as keyof typeof quiz_questoes.resultados]
    }
  }

  async checkResult(respostas: string[]) {
    const resultado = respostas.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length > 
        arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })
    return resultado
  }

}
