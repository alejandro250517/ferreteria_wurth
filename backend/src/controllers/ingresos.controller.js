const mongoose = require('mongoose');

const Ingreso = require('../models/Ingreso');
const Inventario = require('../models/Inventario');

const registrarIngreso = async (req, res) => {
  try {
    const { productoId, cantidad_ingresada, fecha_ingreso, proveedor, precio_unitario } = req.body;

    // Convertir la cantidad ingresada a un valor numérico
    const cantidadNumerica = parseInt(cantidad_ingresada, 10);

    // Calcular el precio total
    const precio_total = cantidadNumerica * precio_unitario;

      // Si no existe, creamos un nuevo ingreso
      const nuevoIngreso = new Ingreso({
        productoId,
        cantidad_ingresada: cantidadNumerica,
        fecha_ingreso,
        proveedor,
        precio_unitario,
        precio_total // Guardamos el precio total
      });
      await nuevoIngreso.save();
    //}

    // Actualizar o crear el inventario
    let inventario = await Inventario.findOne({ producto: productoId });
    if (inventario) {
      inventario.cantidad += cantidadNumerica;
      
    } else {
      inventario = new Inventario({
        producto: productoId,
        cantidad: cantidadNumerica
      });
    }

    await inventario.save();


    // Respuesta exitosa
    res.status(201).json({ message: "Ingreso registrado o actualizado con éxito" });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
}

const obtenerIngresos = async (req, res) => {
  try {
    const mostrarIngresos = await Ingreso.find().populate('productoId');
    res.status(201).json(mostrarIngresos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const actualizarIngreso = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID no valido' });
  }
  try {

    //Obtener el ingreso para actualizarlo
    const ingresoPrevio = await Ingreso.findById(id);
    if (!ingresoPrevio) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }

    const {productoId, cantidad_ingresada:nuevaCantidadIngresada} = req.body;

    //Calcular la diferencia de la cantidad ingresada
    const diferenciaCantidad = parseInt(nuevaCantidadIngresada, 10) - parseInt(ingresoPrevio.cantidad_ingresada);

    const modificarIngreso = await Ingreso.findByIdAndUpdate(id, req.body, { new: true });
    if (!modificarIngreso) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }
    res.status(200).json(modificarIngreso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const eliminarIngreso = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID no valido' });
  }
  try {
    const borrarIngreso = await Ingreso.findByIdAndDelete(id);
    if (!borrarIngreso) {
      return res.status(404).json({ message: 'Ingreso no encontrado' });
    }
    res.status(200).json(borrarIngreso); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = { registrarIngreso, obtenerIngresos, actualizarIngreso, eliminarIngreso };
