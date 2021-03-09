import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import loadable from '@/utils/loadable'

const HomePage = loadable(() => import('@/pages/HomePage'))
// import HomePage from './pages/HomePage'
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default Router
