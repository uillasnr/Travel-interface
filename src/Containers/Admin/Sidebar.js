import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import paths from "./Paths";
import { useUser } from "../../hooks/UserContext";

function NewTrips() {
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
  };
  return (
    <Card className=" h-[100vh] drop-shadow-2xl bg-slate-700 w-full max-w-[20rem] text-white p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="white">
          <div className="font-extrabold mb-14 text-center text-4xl">
            Travel
          </div>
        </Typography>
      </div>
      <List>
        <ListItem className="gap-3">
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={paths.Reservations}>
            Todas as reservas
          </Link>
        </ListItem>
        <ListItem className="gap-3">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={paths.AllTrips}>
            Todas as viagens
          </Link>
        </ListItem>
        <ListItem className="gap-3">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={paths.CreateTrips}>
            Criar viagem
          </Link>
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
        <ListItem className="gap-3">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={paths.CreateCategory}>
            Categorias
          </Link>
        </ListItem>

        <ListItem className="gap-3">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="mt-28 font-bold gap-3" onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 " />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={"/"}>
            Sair
          </Link>
        </ListItem>
      </List>
    </Card>
  );
}

export default NewTrips;
