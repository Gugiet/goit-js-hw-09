import Notiflix from 'notiflix';

const firstDelay = document.querySelector('[name=delay]');
const delayStep = document.querySelector('[name=step]');
const amount = document.querySelector('[name=amount]');
const submitBtn = document.querySelector('[type=submit]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        resolve();
      } else {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        reject();
      }
    }, delay);
  });
}

submitBtn.addEventListener('click', event => {
  event.preventDefault();

  const promises = [];

  for (let i = 0; i < Number(amount.value); i++) {
    const position = i + 1;
    const delayValue = Number(firstDelay.value) + Number(delayStep.value * i);

    const promise = createPromise(position, delayValue)
      .then(() => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delayValue}ms`
        );
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delayValue}ms`
        );
      });

    promises.push(promise);
  }
});
// update
