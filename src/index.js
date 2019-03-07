import Formicary from './ann/Formicary.js';
import FormicaryRenderer from './view/FormicaryRenderer.js'
import NeuralNetworkRenderer from './view/NeuralNetworkRenderer.js'
import NeuralNetwork from './ann/NeuralNetwork.js'

const neuralNetwork = new NeuralNetwork(6, 2)
neuralNetwork.addRandomSynapse()
// neuralNetwork.addRandomNeuron()

document.addEventListener('DOMContentLoaded', () =>
{
	const formicary = buildFormicary()

	const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('Canvas'))
	const context = canvas.getContext('2d')
	
	const neuralNetworkRenderer = new NeuralNetworkRenderer()
	const formicaryRenderer = new FormicaryRenderer(formicary.width, formicary.height)

	const fixCanvasSize = () =>
	{
		canvas.width = document.body.clientWidth
		canvas.height = document.body.clientHeight
	}

	const gameLoop = time =>
	{
		window.requestAnimationFrame(gameLoop)

		const width = canvas.width
		const height = canvas.height
		
		context.clearRect(0, 0, width, height)
		
		formicary.update()
		
		neuralNetworkRenderer.render(neuralNetwork)
		formicaryRenderer.render(formicary)
		
		context.drawImage(neuralNetworkRenderer.canvas, 10, 10)
		context.drawImage(formicaryRenderer.canvas, 10, 120)
	}

	window.addEventListener('resize', fixCanvasSize)

	fixCanvasSize()
	gameLoop()
})

const buildFormicary = () =>
{
	const width = 500
	const height = 500
	const anthillX = Math.floor(Math.random() * 400 + 50)
	const anthillY = Math.floor(Math.random() * 400 + 50)
	const anthillRadius = 15
	const populations = 1

	const formicary = new Formicary(width, height, anthillX, anthillY, anthillRadius, populations)

	const food = 100
	for (let i = 0; i < food; i++)
	{
		formicary.dropFoodAt(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500), 5)
	}

	return formicary
}
