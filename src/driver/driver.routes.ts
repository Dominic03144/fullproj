import {Router} from "express"

import {getDrivers,getDriverById,createDriver,updateDriver,deleteDriver} from "./driver.controller"

export const driverRouter=Router();

driverRouter.get("/driver",getDrivers).post("/driver",createDriver)

driverRouter.delete("/driver",deleteDriver)

driverRouter.get("/driver/:id",getDriverById)
driverRouter.put("/driver/:id",updateDriver)