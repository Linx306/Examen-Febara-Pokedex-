import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';

export default function Dashboard() {
  const [team, setTeam] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemonResult, setPokemonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 1. Cargar el equipo guardado del backend al iniciar
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team');
        setTeam(response.data);
      } catch (err) {
        console.error('Error al cargar el equipo', err);
      }
    };
    fetchTeam();
  }, []);

  // 2. Buscar Pokémon en la PokéAPI externa
  const searchPokemon = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setLoading(true);
    setPokemonResult(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      setPokemonResult(response.data);
    } catch (err) {
      alert('Pokémon no encontrado');
    } finally {
      setLoading(false);
    }
  };

  // 3. Agregar al equipo local (Máximo 6)
  const addToTeam = (poke) => {
    if (team.length >= 6) {
      alert('¡Tu equipo ya tiene 6 Pokémon! Límite alcanzado.');
      return;
    }
    if (team.some((p) => p.poke_id === poke.id)) {
      alert('Este Pokémon ya está en tu equipo.');
      return;
    }

    const newMember = {
      poke_id: poke.id,
      poke_name: poke.name,
      poke_sprite: poke.sprites.front_default
    };

    setTeam([...team, newMember]);
  };

  // Remover del equipo local
  const removeFromTeam = (pokeId) => {
    setTeam(team.filter((p) => p.poke_id !== pokeId));
  };

  // 4. Guardar equipo completo en el backend (MySQL)
  const saveTeamToCloud = async () => {
    try {
      await api.post('/team', { pokemons: team });
      alert('¡Equipo guardado exitosamente en la base de datos!');
    } catch (err) {
      alert('Error al guardar el equipo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h2>PokéDex Manager - Tu Equipo ({team.length}/6)</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cerrar Sesión
        </button>
      </header>

      {/* Sección del Equipo Actual */}
      <section style={{ margin: '20px 0' }}>
        <h3>Mi Equipo Actual</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', minHeight: '120px', background: '#e9ecef', padding: '15px', borderRadius: '8px' }}>
          {team.length === 0 ? (
            <p style={{ color: '#6c757d' }}>No tienes Pokémon en tu equipo. ¡Busca y agrega hasta 6!</p>
          ) : (
            team.map((poke) => (
              <div key={poke.poke_id} style={{ background: 'white', padding: '10px', borderRadius: '6px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <img src={poke.poke_sprite} alt={poke.poke_name} width="80" />
                <p style={{ textTransform: 'capitalize', fontWeight: 'bold', margin: '5px 0' }}>{poke.poke_name}</p>
                <button onClick={() => removeFromTeam(poke.poke_id)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>
        {team.length > 0 && (
          <button onClick={saveTeamToCloud} style={{ marginTop: '10px', padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Guardar Equipo en la Nube
          </button>
        )}
      </section>

      {/* Buscador de la PokéAPI */}
      <section style={{ marginTop: '30px' }}>
        <h3>Buscar Pokémon</h3>
        <form onSubmit={searchPokemon} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Ej. pikachu, charizard, 1..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px', width: '250px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Buscar
          </button>
        </form>

        {loading && <p>Buscando en la PokéAPI...</p>}

        {pokemonResult && (
          <div style={{ marginTop: '20px', background: '#fff', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', display: 'inline-block', textAlign: 'center' }}>
            <img src={pokemonResult.sprites.front_default} alt={pokemonResult.name} width="120" />
            <h4 style={{ textTransform: 'capitalize', margin: '10px 0' }}>{pokemonResult.name} (ID: {pokemonResult.id})</h4>
            <p>Tipo(s): {pokemonResult.types.map(t => t.type.name).join(', ')}</p>
            <button onClick={() => addToTeam(pokemonResult)} style={{ padding: '8px 15px', background: '#ffcb05', color: '#2a75bb', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Agregar al Equipo ➕
            </button>
          </div>
        )}
      </section>
    </div>
  );
}