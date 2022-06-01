const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'service-worker.js',
        {
          scope: '/public/',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

registerServiceWorker();

function getRandomIntInclusive() {
  const min = Math.ceil(800000);
  const max = Math.floor(999999);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// fill info
const date = new Date().toISOString();
const number = getRandomIntInclusive();
document.getElementById('datetime').innerHTML = `Hora: ${date}`;
document.getElementById('order-number').innerHTML = `Pedido: ${number}`;

const handleMessageNotifications = () => {
  if (!navigator.serviceWorker || !navigator.serviceWorker.controller) return;

  navigator.serviceWorker.controller.postMessage({
    number,
    date
  });

  navigator.serviceWorker.addEventListener('message', event => {
    const validWindow = event.data.number === number;
    if (!validWindow) {
      document.getElementById('order').innerHTML = '';
      document.getElementById('invalid-tab').style.display = 'block';
    }
  })
};


handleMessageNotifications();
