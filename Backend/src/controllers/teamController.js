const pool = require('../config/db');

// Obtener el equipo del usuario autenticado
const getTeam = async (req, res) => {
    const userId = req.user.id;
    try {
        const [team] = await pool.query('SELECT poke_id, poke_name, poke_sprite FROM user_teams WHERE user_id = ?', [userId]);
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el equipo', error: error.message });
    }
};

// Guardar / Reemplazar el equipo completo del usuario
const saveTeam = async (req, res) => {
    const userId = req.user.id;
    const { pokemons } = req.body; // Espera un array de objetos [{ poke_id, poke_name, poke_sprite }]

    if (!Array.isArray(pokemons)) {
        return res.status(400).json({ message: 'Formato de datos inválido' });
    }

    // Máximo 6 Pokemon por equipo
    if (pokemons.length > 6) {
        return res.status(400).json({ message: 'El equipo no puede tener más de 6 Pokémon' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Borrar el equipo anterior del usuario para actualizarlo con el nuevo
        await connection.query('DELETE FROM user_teams WHERE user_id = ?', [userId]);

        // Insertar los nuevos Pokemon seleccionados
        for (const p of pokemons) {
            await connection.query(
                'INSERT INTO user_teams (user_id, poke_id, poke_name, poke_sprite) VALUES (?, ?, ?, ?)',
                [userId, p.poke_id, p.poke_name, p.poke_sprite]
            );
        }

        await connection.commit();
        connection.release();
        res.json({ message: 'Equipo guardado exitosamente' });
    } catch (error) {
        await connection.rollback();
        connection.release();
        res.status(500).json({ message: 'Error al guardar el equipo', error: error.message });
    }
};

module.exports = { getTeam, saveTeam };