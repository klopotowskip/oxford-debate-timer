import { setupMessages as setupMessagesPL }
  from '~/src/messages/pl/setup-messages';
import { counterMessages as counterMessagesPL }
  from '~/src/messages/pl/counter-messages';

  import { setupMessages as setupMessagesEN }
    from '~/src/messages/en/setup-messages';
  import { counterMessages as counterMessagesEN }
    from '~/src/messages/en/counter-messages';

const getLocale = () => {
  return navigator.language || navigator.userLanguage;
}

const getSetupMessages = () => {
  const locale = getLocale();
  if(locale.startsWith('en')){ //ENGLISH
    return setupMessagesEN;
  }
  else if(locale.startsWith('pl')){ //POLISH

    return setupMessagesPL;
  } else { //return ENGLISH
    return setupMessagesEN;
  }
}

const getCounterMessages = () => {
  const locale = getLocale();
  if(locale.startsWith('en')){ //ENGLISH
    return counterMessagesEN;
  }
  else if(locale.startsWith('pl')){ //POLISH
    return counterMessagesPL;
  } else { //return ENGLISH
    return counterMessagesEN;
  }
}

export { getLocale, getSetupMessages, getCounterMessages }
