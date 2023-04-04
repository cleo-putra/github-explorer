import {render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from './Home'

it ('allows me to type Github user name', () => {
  render (<Home />)

  userEvent.type(screen.getByPlaceholderText(/Insert Username Github/i), 'Vincent')
  userEvent.click(screen.getByRole('button', {name: /search/i}))
})