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

function NewTrips() {
  return (

    <Card className="h-[100vh] drop-shadow-2xl bg-slate-500 w-full max-w-[20rem] text-white p-4 shadow-xl shadow-blue-gray-900/5">
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
        </ListItem >
        <ListItem className="gap-3">
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={paths.CreateTrips}>
            Criar viagem
          </Link>
        </ListItem >
        <ListItem className="gap-3">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          Inbox
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem >
        <ListItem className="gap-3">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          Profile
        </ListItem >
        <ListItem className="gap-3">
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5 my-4" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem className="mt-52 gap-3">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 " />
          </ListItemPrefix>
          <Link className="w-max transition-all " to={"/"}>
            Log Out
          </Link>
        </ListItem >
      </List>
    </Card>

  )
}

export default NewTrips;
