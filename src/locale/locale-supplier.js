import { setupMessages as setupMessagesPL }
  from '~/src/messages/pl/setup-messages';
import { counterMessages as counterMessagesPL }
  from '~/src/messages/pl/counter-messages';


const getLocale = () => {
  return navigator.language || navigator.userLanguage;
}

const getSetupMessages = () => {
  const locale = getLocale();
  if(locale.startsWith('en')){ //ENGLISH

  }
  else if(locale.startsWith('pl')){ //POLISH

    return setupMessagesPL;
  } else { //return ENGLISH

  }
}

const getCounterMessages = () => {
  const locale = getLocale();
  if(locale.startsWith('en')){ //ENGLISH

  }
  else if(locale.startsWith('pl')){ //POLISH
    return counterMessagesPL;
  } else { //return ENGLISH

  }
}

export { getLocale, getSetupMessages, getCounterMessages }
