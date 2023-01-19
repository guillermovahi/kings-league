import { Hono } from 'hono' 
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import presidents from '../db/presidents.json'
import teams from '../db/teams.json'

const app = new Hono()

app.get('/', (context) => context.json([
	{
		endpoint: '/leaderboard',
		description: 'Returns the leaderboard',
	},
	{
		endpoint: '/teams',
		description: 'Returns the teams',
	},
	{
		endpoint: '/presidents',
		description: 'Returns the presidents',
	},
]))

app.get('/leaderboard', (context) => {
	return context.json(leaderboard)
})

app.get('/presidents', (context) => {
	return context.json(presidents)
})

app.get('/presidents/:id', (context) => {
	const id = context.req.params('id')
	const foundPresidents = presidents.find(president => president.id === id)
	
	return foundPresidents 
		? context.json(foundPresidents) 
		: context.json({ message: 'President not found' }, 404)
})

app.get('/teams', (context) => {
	return context.json(teams)
})


app.get('/static/*', serveStatic({ root: './'}))

export default app