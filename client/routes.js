import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, DisplayPage, Profile} from './components'
import {me} from './store'

let data = {
  //tech
  tech: [
    {
      name: 'google',
      url:
        'https://twitter.com/JennaGiordano15/lists/google?ref_src=twsrc%5Etfw',
    },
    {
      name: 'facebook',
      url:
        'https://twitter.com/JennaGiordano15/lists/facebook?ref_src=twsrc%5Etfw',
    },
    {
      name: 'technology',
      url:
        'https://twitter.com/JennaGiordano15/lists/technology?ref_src=twsrc%5Etfw',
    },
    {
      name: 'latest technology',
      url:
        'https://twitter.com/JennaGiordano15/lists/latest-technology?ref_src=twsrc%5Etfw',
    },
    {
      name: 'tech news',
      url:
        'https://twitter.com/JennaGiordano15/lists/tech-news?ref_src=twsrc%5Etfw',
    },
    {
      name: 'amazon',
      url:
        'https://twitter.com/JennaGiordano15/lists/amazon?ref_src=twsrc%5Etfw',
    },
    {
      name: 'future technologies',
      url:
        'https://twitter.com/JennaGiordano15/lists/future-technologies?ref_src=twsrc%5Etfw',
    },
    {
      name: 'mac',
      url: 'https://twitter.com/JennaGiordano15/lists/mac?ref_src=twsrc%5Etfw',
    },
    {
      name: 'tech companies',
      url:
        'https://twitter.com/JennaGiordano15/lists/tech-companies?ref_src=twsrc%5Etfw ',
    },
  ],

  //style data
  style: [
    {
      name: 'style',
      url:
        'https://twitter.com/JennaGiordano15/lists/fashion-trends?ref_src=twsrc%5Etfw',
    },
    {
      name: 'fashion trends',
      url:
        'https://twitter.com/JennaGiordano15/lists/fashion-trends?ref_src=twsrc%5Etfw',
    },
    {
      name: 'accessories',
      url:
        'https://twitter.com/JennaGiordano15/lists/accessories?ref_src=twsrc%5Etfw',
    },
    {
      name: 'chanel',
      url:
        'https://twitter.com/JennaGiordano15/lists/chanel?ref_src=twsrc%5Etfw',
    },
    {
      name: 'vogue',
      url:
        'https://twitter.com/JennaGiordano15/lists/vogue?ref_src=twsrc%5Etfw',
    },
    {
      name: 'womens fashion',
      url:
        'https://twitter.com/JennaGiordano15/lists/womens-fashion?ref_src=twsrc%5Etfw',
    },
    {
      name: 'mens fashion',
      url:
        'https://twitter.com/JennaGiordano15/lists/mens-fashion?ref_src=twsrc%5Etfw',
    },
    {
      name: 'paris fashion',
      url:
        'https://twitter.com/JennaGiordano15/lists/paris-fashion?ref_src=twsrc%5Etfw',
    },
    {
      name: 'fashion news',
      url:
        'https://twitter.com/JennaGiordano15/lists/fashion-news?ref_src=twsrc%5Etfw',
    },
  ],

  //cuisine data
  cuisine: [
    {
      name: 'food',
      url: 'https://twitter.com/JennaGiordano15/lists/food?ref_src=twsrc%5Etfw',
    },
    {
      name: 'recipes',
      url:
        'https://twitter.com/JennaGiordano15/lists/recipes?ref_src=twsrc%5Etfw',
    },
    {
      name: 'savory',
      url:
        'https://twitter.com/JennaGiordano15/lists/savory?ref_src=twsrc%5Etfw',
    },
    {
      name: 'sweet',
      url:
        'https://twitter.com/JennaGiordano15/lists/sweet?ref_src=twsrc%5Etfw',
    },
    {
      name: 'cooking trends',
      url:
        'https://twitter.com/JennaGiordano15/lists/cooking-trends?ref_src=twsrc%5Etfw',
    },
    {
      name: 'cooking news',
      url:
        'https://twitter.com/JennaGiordano15/lists/cooking-news?ref_src=twsrc%5Etfw',
    },
    {
      name: 'Bobby Flay',
      url:
        'https://twitter.com/JennaGiordano15/lists/bobby-flay?ref_src=twsrc%5Etfw',
    },
    {
      name: 'baking',
      url:
        'https://twitter.com/JennaGiordano15/lists/baking?ref_src=twsrc%5Etfw',
    },
    {
      name: 'Michelin Star',
      url:
        'https://twitter.com/JennaGiordano15/lists/michelin-star?ref_src=twsrc%5Etfw',
    },
  ],
}

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/style"
          render={(routeProps) => <DisplayPage keyWords={data.style} />}
        />
        <Route
          path="/tech"
          render={(routeProps) => <DisplayPage keyWords={data.tech} />}
        />
        <Route
          path="/cuisine"
          render={(routeProps) => <DisplayPage keyWords={data.cuisine} />}
        />
        <Route path="/profile" component={Profile} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
