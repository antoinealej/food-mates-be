import express from 'express';

const router = express.Router();

router.get('/:id/photo/:name', (req, res) => {
  const { id, name } = req.params;
  return res.sendFile(`${process.cwd()}/data/${id}/${name}`);
});

export default router;