import Prospect from '../models/prospects.js';

export const getProspects = async (req, res) => {
    let {sortBy = 'score', order = 'asc', page = 1, limit = 10 } = req.query;
    // Calculate the number of documents to omit (skip)
    const skip = (page - 1) * limit;
    const ord = order === 'asc' ? 1 : -1; // Default to 'desc' (-1) if no order provided
  
    try {
        const items = await Prospect.find().sort({ [sortBy]: ord }).skip(skip).limit(limit);
        // Count the total number of documents to calculate the total pages
        const totalItems = await Prospect.countDocuments();
        res.json({
            data: items,
            page,
            totalPages: Math.ceil(totalItems / limit),
            totalItems,
          });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: `${err}` });
    }
}
