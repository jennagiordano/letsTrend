import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import Modal from '@material-ui/core/Modal'
import {TwitterTimelineEmbed} from 'react-twitter-embed'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 1500,
    height: 750,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function createTileData(keyWords) {
  if (!keyWords) return []
  let tileData = []
  for (let i = 0; i < 9; i++) {
    let newImg = `https://source.unsplash.com/1600x900/?${keyWords[i].name}`
    tileData.push({
      img: newImg,
      cols: 1,
      title: keyWords[i].name,
      url: keyWords[i].url,
    })
  }

  return tileData
}

export default function DisplayPage(props) {
  const classes = useStyles()
  const tileData = createTileData(props.keyWords)
  const [open, setOpen] = React.useState(false)
  const [modalTitle, setTitle] = React.useState('#tech')
  const [techUrl, setUrl] = React.useState('http://twitter.com')

  const handleOpen = (e) => {
    setTitle(`#${e.target.name}`)
    setUrl(e.target.alt)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={500} className={classes.gridList} cols={3}>
        {tileData.map((tile) => (
          <GridListTile
            key={tile.img}
            cols={tile.cols || 1}
            onClick={handleOpen}
          >
            <img src={tile.img} alt={tile.url} name={tile.name} />
            <GridListTileBar
              title={`#${tile.title}`}
              titlePosition="top"
              className={classes.titleBar}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <p id="transition-modal-description">
                <TwitterTimelineEmbed
                  sourceType="list"
                  url={techUrl}
                  slug={techUrl}
                  ownerScreenName="JennaGiordano15"
                  options={{height: 600}}
                />
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}
