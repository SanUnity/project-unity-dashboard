const CURRENT_TOKEN_KEY = 'cT';
const CURRENT_MENU_OPTION_KEY = 'cMO';
const CURRENT_USER_KEY = 'user';
const CURRENT_COOKIES_KEY = 'cA';
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // eslint-disable-line
const NUMBERS_PATTERN = /^[0-9]/
const CURRENT_LGN_KEY = "lng"

const USER_ROLES = [
  {
    id: 1,
    name: 'Administrador'
  },
  {
    id: 2,
    name: 'Consultor'
  }
]

const STATE_MADRID = [
  {
    id: 'ES13',
    name: 'Madrid'
  }]
const PROVINCE_MADRID = [ {
  id: 'ES44',
  name: 'Madrid'
}
]

const GENDERS = [
  {
    id: "male",
    name: "Hombre"
  }, 
  {
    id: "female",
    name: "Mujer"
  }
]

const SYMTOMPS_FILTER =[
  { 
    id: "conditions",
    name: "Enfermedad crónica", 
  },
  { 
    id: "breathing",
    name: "Falta de aire", 
  },
  {
    id: "cough",
    name: "Tos", 
  },
  { 
    id: "fever",
    name: "Fiebre", 
  },
  { 
    id: "gastrointestinal",
    name: "Gastrointestinal", 
  },
  { 
    id: "lossSmellTaste",
    name: "Pérdida de olfato", 
  },
  { 
    id: "meet",
    name: "Contacto estrecho", 
  },
  { 
    id: "pain",
    name: "Dolor muscular", 
  },
  { 
    id: "snot",
    name: "Mucosidad"
  }
]

const GET_AGE_COLOR = d => {
  return d === 0
    ? '#7C6EF0'
    : d === 1
    ? '#EA5455'
    : d === 2
    ? '#35B6AC'
    : d === 3
    ? '#FFA551'
    : d === 4
    ? '#BCE0FD'
    : d === 5
    ? '#727277'
    : d === 6
    ? '#24A5E7'
    : d === 7
    ? '#FC8370'
    : d === 8
    ? '#C2549D'
    : d === 9
    ? '#7E549E'
    : d === 10
    ? '#FFCB3F'
    : '#FFEDA0';
};

const MENU_DATA = {
  name: "root",
  children: [
    {
      name: "Resultado autodiagnósticos",
      icon: "/misc/icons/virus.svg",
      onlyAdmin: false,
      children: [
        {name: "Resultado global", icon: "/misc/icons/check-clear.png"},
        {name: "Patologías", icon: "/misc/icons/check-clear.png"},
        {name: "Sintomatología", icon: "/misc/icons/check-clear.png"}
      ]
    },
    {
      name: "Evolución autodiagnósticos",
      icon: "/misc/icons/cruz.svg",
      onlyAdmin: false,
      children: []
    },
    {
      name: "Uso de la app",
      icon: "/misc/icons/ic_tablet_red.svg",
      onlyAdmin: false,
    },
    {
      name: "Administración",
      icon: "/misc/icons/ajustes.svg",
      onlyAdmin: true,
      children: [
        {name: "Usuarios", icon: "/misc/icons/check-clear.png"},
        {name: "Notificaciones", icon: "/misc/icons/check-clear.png"},
      ]
    }
  ]
}

export const CHART_CARD_CONFIG = {
  chart: {
    id: "sin síntomas compatibles",
    sparkline: {
      enabled: true
    },
    dropShadow: {
      enabled: true,
      top: 5,
      left: 0,
      blur: 4,
      opacity: 0.1
    }
  },
  colors: ["#028fb6"],
  stroke: {
    curve: "smooth",
    width: 5
  },
  tooltip: {
    x: { show: false }
  }
}

export default {
  CURRENT_TOKEN_KEY,
  EMAIL_PATTERN,
  NUMBERS_PATTERN,
  CURRENT_LGN_KEY,
  CURRENT_COOKIES_KEY,
  CURRENT_USER_KEY,
  MENU_DATA,
  STATE_MADRID,
  PROVINCE_MADRID,
  CHART_CARD_CONFIG,
  GET_AGE_COLOR,
  USER_ROLES,
  CURRENT_MENU_OPTION_KEY,
  GENDERS,
  SYMTOMPS_FILTER
};
