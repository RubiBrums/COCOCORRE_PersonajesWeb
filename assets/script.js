import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://zofktotpjvmgikzmqpwd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZmt0b3RwanZtZ2lrem1xcHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjQzMDgsImV4cCI6MjA3NjA0MDMwOH0.ZnFAxmch40wWBda-zawJ9VZ_7ML7sKKYiiTbTUFZUdw' // tu clave pública (anon key)

const supabase = createClient(supabaseUrl, supabaseKey)

const detalleNombre = document.getElementById('detalleNombre');
const detalleDesc = document.getElementById('detalleDesc');
const detalleImg = document.getElementById('detalleImg');

const botonesDetalles = document.querySelectorAll('.btn-filter');
botonesDetalles.forEach(boton => {
    boton.addEventListener('click', async() => {
        const id = boton.getAttribute('data-id');
        await mostrarDetalles(id);
    });
});

async function mostrarDetalles(id) {
    const { data, error } = await supabase
        .from('Personajes')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        console.error('Error o sin datos.', error);
        detalleNombre.textContent = "No encontrado.";
        detalleDesc.textContent = "No hay información disponible.";
        detalleImg.src = "assets/img/placeholder.png";
        return;
    }

    detalleNombre.textContent = data.nombre;
    detalleDesc.textContent = data.descripcion;

    const nombreImg = data.nombre.toLowerCase().replaceAll(' ', '');
    detalleImg.src = `assets/img/full_${nombreImg}.png`;
    detalleImg.alt = data.nombre;
}

const enlacesFiltro = document.querySelectorAll('.nav-filter');
const cartas = document.querySelectorAll('#contenedorCartas .card');


enlacesFiltro.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const filtro = enlace.dataset.filter;

        enlacesFiltro.forEach(l => l.parentElement.classList.remove('active'));
        enlace.parentElement.classList.add('active');

        cartas.forEach(carta => {
            if (filtro === 'todos') {
                carta.parentElement.parentElement.style.display = 'block';
            } else if (carta.classList.contains(filtro)) {
                carta.parentElement.parentElement.style.display = 'block';
            } else {
                carta.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});