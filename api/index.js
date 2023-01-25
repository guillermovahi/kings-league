import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import leaderboard from '../db/leaderboard.json'
import teams from '../db/teams.json'
import presidents from '../db/presidents.json'
import topScorers from '../db/top_scorers.json'
import mvp from '../db/mvp.json'
import topAssists from '../db/top_assists.json'

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
	{
		endpoint: '/top-scorers',
		description: 'Returns the top scorers',
	},
	{
		endpoint: '/top-assists',
		description: 'Returns the top assists',
	},
	{
		endpoint: '/mvp',
		description: 'Returns the mvp',
	},
]))

app.get('/leaderboard', (context) => {
	return context.json(leaderboard)
})

app.get('/teams', (context) => {
	return context.json(teams)
})

app.get('/presidents', (context) => {
	return context.json(presidents)
})

app.get('/top-scorers', (context) => {
	return context.json(topScorers)
})

app.get('/top-assists', (context) => {
	return context.json(topAssists)
})

app.get('/mvp', (context) => {
	return context.json(mvp)
})

app.get('/presidents/:id', (context) => {
	const id = context.req.params('id')
	const foundPresidents = presidents.find(president => president.id === id)

	return foundPresidents
		? context.json(foundPresidents)
		: context.json({ message: 'President not found' }, 404)
})

app.get('/teams/:id', (context) => {
	const id = context.req.params('id')
	const foundTeams = teams.find(team => team.id === id)

	return foundTeams
		? context.json(foundTeams)
		: context.json({ message: 'Team not found' }, 404)
})


app.get('/static/*', serveStatic({ root: './'}))

export default app