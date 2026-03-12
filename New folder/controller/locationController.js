import Area from "../model/areaModel.js";
import City from "../model/cityModel.js";

export const getAreas = async (req, res) => {
    try {
        const areas = await Area.find().sort({ name: 1 });
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCitiesByArea = async (req, res) => {
    try {
        const { areaId } = req.params;
        const cities = await City.find({ area: areaId }).sort({ name: 1 });
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createArea = async (req, res) => {
    try {
        const { name } = req.body;
        const area = await Area.create({ name });
        res.status(201).json(area);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCity = async (req, res) => {
    try {
        const { name, areaId } = req.body;
        const city = await City.create({ name, area: areaId });
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
