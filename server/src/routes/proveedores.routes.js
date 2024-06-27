import { Router } from "express";
const router = Router();
import * as ctrlProveedor from "../controllers/proveedores.controller.js";
import { lotes, lotes_vencidos, lotesListar, deleteLote } from "../controllers/lotes.controller.js";

router.get("/proveedor", ctrlProveedor.getProveedores);

router.get("/proveedor/:id_proveedor", ctrlProveedor.getProveedor);

router.post("/proveedor", ctrlProveedor.postProveedor);

router.patch("/proveedor/:id_proveedor", ctrlProveedor.updateProveedor);

router.delete("/proveedor/:id_proveedor", ctrlProveedor.deleteProveedor);

router.post("/lotesagregar", lotes);

router.get("/loteslistar", lotesListar);

router.get("/lotes", lotes_vencidos)

router.delete("/lotes/:id_lote", deleteLote);


export default router;
