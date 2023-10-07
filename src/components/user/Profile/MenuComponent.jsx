import Box from "@mui/material/Box";

import Menu from "@mui/material/Menu";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import clsx from "clsx";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import * as React from "react";
import io from "socket.io-client";
import FriendRequestList from "./FriendRequestList";
import { useDispatch, useSelector } from "react-redux";
import {
  newFriendRequest,
  openFriendRequestsReceived,
  startGetFriendRequestsReceived,
  startOpenedFriendRequestsReceived,
} from "../../../actions/user";

let socket;
const initSocket = (userId) => {
  socket = io("http://localhost:8080", {
    withCredentials: true,
    auth: {
      userId: userId,
    },
  });
};
const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuRef = React.useRef(null);
  const { friendRequestsReceived } = useSelector((state) => state.user);
  const { openedFriendRequests } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);

  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  React.useEffect(() => {
    // Configura el socket con el userId cuando cambie
    if (user) {
      console.log("id", user.uid);
      initSocket(user.uid); // Inicializa el socket cuando el usuario cambie.
    }
  }, [user]);

  React.useEffect(() => {
    const getFriendList = async () => {
      await dispatch(startGetFriendRequestsReceived());
      setIsLoading(false);
    };
    getFriendList();
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (!openedFriendRequests) {
      dispatch(startOpenedFriendRequestsReceived());
    }
  };

  React.useEffect(() => {
    // Comprueba que el socket exista antes de intentar configurar el oyente.
    if (socket) {
      socket.on("solicitudAmistad", (data) => {
        console.log(data);
        const isAlreadyOnFriendRequests = friendRequestsReceived.some(
          (friendRequest) => friendRequest._id === data._id
        );

        if (isAlreadyOnFriendRequests) {
          return;
        }

        dispatch(newFriendRequest(data));
        dispatch(openFriendRequestsReceived(false));
      });

      // No olvides deshacerte de los listeners cuando el componente se desmonte
      return () => {
        socket.off("solicitudAmistad");
      };
    }
  }, [socket, friendRequestsReceived, dispatch]); // Agregar el socket y las solicitudes de amigos recibidos como dependencias.

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (event) => {
    event.stopPropagation(); // Evita que el menú se cierre al hacer clic dentro del elemento del menú
  };

  const handleContainerClick = (event) => {
    if (menuRef.current && menuRef.current.contains(event.target)) {
      event.stopPropagation(); // Evita que el menú se cierre al hacer clic dentro del menú
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
        onMouseDown={handleContainerClick}
      >
        <Tooltip title="Friends request">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              boxShadow: "none",
              ml: 2,
            }}
            aria-controls={anchorEl ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl)}
          >
            <div className="friend-requests-badge">
              <PeopleAltIcon
                className={clsx(
                  {
                    "unopened-friend-request": !openedFriendRequests,
                  },
                  "icon-friend-requests"
                )}
              />
              {!openedFriendRequests && friendRequestsReceived.length > 0 && (
                <div className="badge">{friendRequestsReceived.length}</div>
              )}
            </div>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleItemClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            width: 235, // Tamaño fijo del menú
            // marginTop: 1.5, // Margen superior fijo
            filter: "drop-shadow(0px 2px 2px rgba(0,0,  0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "& li": {
              fontSize: "0.8rem", // Tamaño de letra personalizado para los elementos del menú
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <FriendRequestList
          isLoading={isLoading}
          friendRequestsReceived={friendRequestsReceived}
        />
      </Menu>
    </>
  );
};

export default MenuComponent;
