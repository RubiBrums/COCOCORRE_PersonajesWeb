import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://zofktotpjvmgikzmqpwd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZmt0b3RwanZtZ2lrem1xcHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjQzMDgsImV4cCI6MjA3NjA0MDMwOH0.ZnFAxmch40wWBda-zawJ9VZ_7ML7sKKYiiTbTUFZUdw'

const supabase = createClient(supabaseUrl, supabaseKey)

const detalleNombreCard = document.getElementById('detalleNombre');
const detalleDescCard = document.getElementById('detalleDesc');
const detalleImgCard = document.getElementById('detalleImg');

const modalNombre = document.getElementById('modalNombre');
const modalDesc = document.getElementById('modalDesc');
const modalImg = document.getElementById('modalImg');
const detalleModalEl = document.getElementById('detalleModal');
const detalleModal = detalleModalEl ? new bootstrap.Modal(detalleModalEl) : null;

const botonesDetalles = document.querySelectorAll('.btn-filter');

botonesDetalles.forEach(boton => {
    boton.addEventListener('click', async() => {
        const id = boton.getAttribute('data-id');

        const { data, error } = await supabase
            .from('Personajes')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            console.error('Error o sin datos.', error);
            return;
        }

        const nombreImg = data.nombre
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replaceAll(' ', '')
            .replaceAll('-', '')
            .replaceAll('_', '');

        const imgSrc = `assets/img/full_${nombreImg}.png`;

        if (detalleNombreCard && detalleDescCard && detalleImgCard) {
            detalleNombreCard.textContent = data.nombre;
            detalleDescCard.textContent = data.descripcion;
            detalleImgCard.src = imgSrc;
            detalleImgCard.alt = data.nombre;
        }

        if (detalleModal && (!detalleNombreCard || window.innerWidth < 992)) {
            modalNombre.textContent = data.nombre;
            modalDesc.textContent = data.descripcion;
            modalImg.src = imgSrc;
            modalImg.alt = data.nombre;
            detalleModal.show();
        }
    });
});

const enlacesFiltro = document.querySelectorAll('.nav-filter');
const cartas = document.querySelectorAll('#contenedorCartas .card');

enlacesFiltro.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const filtro = enlace.dataset.filter;

        enlacesFiltro.forEach(l => l.parentElement.classList.remove('active'));
        enlace.parentElement.classList.add('active');

        cartas.forEach(carta => {
            const columna = carta.parentElement;
            if (filtro === 'todos') {
                columna.style.display = 'block';
            } else if (carta.classList.contains(filtro)) {
                columna.style.display = 'block';
            } else {
                columna.style.display = 'none';
            }
        });
    });
});