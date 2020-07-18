<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>Stock</span>
      <span class="font-weight-light">Trader</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat to="/">Início</v-btn>
      <v-btn flat to="/portfolio">Portfólio</v-btn>
      <v-btn flat to="/stocks">Ações</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat @click="endDay">Finalizar Dia</v-btn>
      <v-btn flat class="red--text darken-1" @click="restartApp">Reiniciar aplicação</v-btn>

      <v-layout align-center>
        <span class="text-uppercase gray--text text--darken-2">
          Saldo: {{ funds | currency }}
        </span>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import baseStocks from '../data/baseStocks';

export default {
  computed: {
    ...mapGetters({
      funds: 'getFunds',
      stocksPortfolio: 'getStocksPortfolio',
      stocks: 'getStocks',
    }),
  },

  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      loadData: 'loadData',
      restartAppAction: 'restartApp',
    }),

    endDay() {
      this.$swal({
        icon: 'warning',
        title: 'Tem certeza?',
        text: 'Uma vez que você finalize o dia, o preço das ações mudarão',
        dangerMode: true,
        buttons: {
          cancel: 'Cancelar',
          ok: {
            text: 'Sim, tenho certeza',
            value: true,
          },
        },
      }).then(async value => {
        if (value) {
          await this.randomizeStocks();

          this.$swal({
            icon: 'success',
            title: 'Tudo certo',
            text: 'O dia foi finalizado, veja o novo preço das ações',
          });

          this.loadData();
        } else {
          this.$swal({
            icon: 'info',
            title: 'Okay',
            text: 'O dia não foi finalizado',
          });
        }
      });
    },

    restartApp() {
      this.$swal({
        icon: 'warning',
        title: 'Tem certeza?',
        text: 'Uma vez reiniciada, a aplicação voltará ao seu estado original',
        dangerMode: true,
        buttons: {
          cancel: 'Cancelar',
          ok: {
            text: 'Sim, tenho certeza',
            value: true,
          },
        },
      }).then(async value => {
        if (value) {
          await this.restartAppAction();

          this.$swal({
            icon: 'success',
            title: 'Tudo certo',
            text: 'A aplicação foi reiniciada',
          });

          this.loadData();
        } else {
          this.$swal({
            icon: 'info',
            title: 'Okay',
            text: 'A aplicação não foi reiniciada',
          });
        }
      });
    },
  },
};
</script>

<style></style>
