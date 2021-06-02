import './NavProfile.css';
import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronDown, ChevronUp } from 'react-feather';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function NavProfile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (isOpen) => {
    setOpen(!isOpen.current);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root} data-testid='nav-profile'>
      <div>
        <div 
          className="nav-profile"
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={() => handleToggle(prevOpen)}
          data-testid="nav-profile-icon"
        >
            <img src={props.image} className="navProfile-image" alt=""/>
            {/* <p>{props.name}</p>
            <p>{props.role}</p> */}
            {!open && <ChevronDown className="wkd-profile-toggle" color='#146A5F'/>}
            {open && <ChevronUp className="wkd-profile-toggle" color='#146A5F'/>}
        </div>


        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal data-testid='nav-profile-dropdownmenu'>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} data-testid="nav-profile-menulist">
                    <MenuItem onClick={handleClose} data-testid='profile-menu'><Link to="/profile" style={{ color: 'rgb(0, 0, 0)' }}>Profil</Link></MenuItem>
                    <MenuItem onClick={handleClose}>Portofolio</MenuItem>
                    <MenuItem onClick={props.handleLogout}>Keluar</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
