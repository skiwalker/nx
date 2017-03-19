'use strict';

module.exports = {
  customValidators: {
    validaTelefones: function(value) {
      
      for (var i = 0, tam = value.length; i < tam; i++) {
        
        if (typeof value[i] !== 'object') {
          return false;
        }

        
        if (!value[i].numero || !value[i].ddd) {
          return false;
        }

        // telefone tem que ter 8 ou 9 dígitos
        var telefone = parseInt(value[i].numero);
        if (typeof telefone !== 'number' || isNaN(telefone) ||
          telefone.toString().length < 8 || telefone.toString().length > 9) {
          return false;
        }

        // ddd tem que ter 2 dígitos
        var ddd = parseInt(value[i].ddd);
        if (typeof ddd !== 'number' || isNaN(ddd) || ddd.toString().length !== 2) {
          return false;
        }
      }

      return true;
    }
  }
};