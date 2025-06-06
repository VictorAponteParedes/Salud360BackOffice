import home from './Home.json';
import patient from './Patient.json';
import doctor from './Doctor.json';
import analysis from './Analysis.json';
import layout from './Layout.json';
import appointment from './Appointment.json'

// Definir el idioma actual, por ejemplo, 'es' para español
const currentLanguage = 'es';


const translations = {
  es: {
    // Traducciones para el idioma español
    ...home,
    ...patient,
    ...doctor,
    ...analysis,
    ...layout,
    ...appointment
  },

};

// Función para obtener la traducción
const translate = (key) => {
  const keys = key.split('.');
  let result = translations[currentLanguage];

  for (const k of keys) {
    result = result[k];
    if (result === undefined) return key; // Devuelve la clave si no encuentra la traducción
  }

  return result || key;
};


export { translate };
