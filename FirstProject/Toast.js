import Toast from 'react-native-tiny-toast';

function showToast(message) {
  if (message) {
    return Toast.show(message, {
      position: Toast.position.TOP,
    });
  }
}

function hideToast(toast) {
  if (toast) Toast.hide(toast);
}

module.exports = {
  show: showToast,
  hide: hideToast,
};
