const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Dynamic controller for all resources
const handleResource = (resourceName) => {
    const resourceRouter = express.Router();
    
    // GET All
    resourceRouter.get('/', async (req, res) => {
        try {
            // Apply filtering, sorting, pagination
            let query = supabase.from(resourceName).select('*', { count: 'exact' });
            
            // Pagination
            const page = parseInt(req.query._page) || 1;
            const limit = parseInt(req.query._limit) || 20;
            const start = (page - 1) * limit;
            const end = start + limit - 1;
            
            // Sorting
            if (req.query._sort) {
                const order = req.query._order === 'desc' ? false : true;
                query = query.order(req.query._sort, { ascending: order });
            } else {
                query = query.order('id', { ascending: false });
            }
            
            // Filtering
            for (const key in req.query) {
                if (!key.startsWith('_')) {
                    query = query.ilike(key, `%${req.query[key]}%`);
                }
            }
            
            const { data, error, count } = await query.range(start, end);
            
            if (error) throw error;
            
            res.json({
                success: true,
                message: `${resourceName} fetched successfully`,
                data,
                meta: { total: count, page, limit }
            });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, errors: [] });
        }
    });
    
    // GET by ID
    resourceRouter.get('/:id', async (req, res) => {
        try {
            const { data, error } = await supabase.from(resourceName).select('*').eq('id', req.params.id).single();
            if (error) throw error;
            if (!data) return res.status(404).json({ success: false, message: 'Not found', errors: [] });
            
            res.json({ success: true, message: `${resourceName} fetched successfully`, data });
        } catch (err) {
            res.status(500).json({ success: false, message: err.message, errors: [] });
        }
    });
    
    // POST
    resourceRouter.post('/', async (req, res) => {
        try {
            const { data, error } = await supabase.from(resourceName).insert([req.body]).select();
            if (error) throw error;
            
            res.status(201).json({ success: true, message: `${resourceName} created successfully`, data: data[0] });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message, errors: [] });
        }
    });
    
    // PUT / PATCH
    const updateHandler = async (req, res) => {
        try {
            const { data, error } = await supabase.from(resourceName).update(req.body).eq('id', req.params.id).select();
            if (error) throw error;
            if (!data || data.length === 0) return res.status(404).json({ success: false, message: 'Not found', errors: [] });
            
            res.json({ success: true, message: `${resourceName} updated successfully`, data: data[0] });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message, errors: [] });
        }
    };
    
    resourceRouter.put('/:id', updateHandler);
    resourceRouter.patch('/:id', updateHandler);
    
    // DELETE
    resourceRouter.delete('/:id', async (req, res) => {
        try {
            const { data, error } = await supabase.from(resourceName).delete().eq('id', req.params.id);
            if (error) throw error;
            
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ success: false, message: err.message, errors: [] });
        }
    });
    
    return resourceRouter;
};

// Map CRUD resources
const resources = ['users', 'products', 'orders', 'employees', 'books', 'students', 'tasks'];
resources.forEach(resource => {
    router.use(`/${resource}`, handleResource(resource));
});

module.exports = router;
