<script setup lang="ts">
  definePageMeta({
    layout: 'style-guides',
  })
</script>

<template>
  <div>
    <!-- Page Title -->
    <h1 class="mb-4 text-4xl font-bold text-gray-900">Alert</h1>
    <!-- Description -->
    <p class="mb-8 text-gray-700">
      Componente per messaggi di feedback contestuali. Gli alert permettono di
      comunicare informazioni importanti all'utente con diversi livelli di
      urgenza e contesto, supportando chiusura manuale e contenuti
      personalizzati.
    </p>
    <div class="rounded-lg bg-white p-8 shadow-sm">
      <h2 class="mb-6 text-2xl font-semibold text-gray-900">
        Tutte le Varianti
      </h2>

      <div class="space-y-4">
        <!-- Info Alert -->
        <div
          class="rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-700"
        >
          <span class="font-semibold">Info:</span> Questo è un alert primario
          per informazioni generali.
        </div>

        <!-- Nota Alert -->
        <div
          class="rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-700"
        >
          <span class="font-semibold">Nota:</span> Alert secondario per
          informazioni di supporto.
        </div>

        <!-- Successo Alert -->
        <div
          class="rounded-lg border border-green-300 bg-green-50 p-4 text-green-700"
        >
          <span class="font-semibold">Successo!</span> L'operazione è stata
          completata con successo.
        </div>

        <!-- Errore Alert -->
        <div
          class="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700"
        >
          <span class="font-semibold">Errore!</span> Si è verificato un errore
          durante l'elaborazione.
        </div>

        <!-- Attenzione Alert -->
        <div
          class="rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-700"
        >
          <span class="font-semibold">Attenzione:</span> Questa azione richiede
          la tua conferma.
        </div>

        <!-- Informazione Alert -->
        <div
          class="rounded-lg border border-cyan-300 bg-cyan-50 p-4 text-cyan-700"
        >
          <span class="font-semibold">Informazione:</span> Nuove funzionalità
          disponibili nel tuo account.
        </div>

        <!-- Importante Alert -->
        <div
          class="rounded-lg border border-gray-400 bg-gray-100 p-4 text-gray-800"
        >
          <span class="font-semibold">Importante:</span> Alert scuro per
          messaggi critici.
        </div>

        <!-- Suggerimento Alert -->
        <div
          class="rounded-lg border border-purple-300 bg-purple-50 p-4 text-purple-700"
        >
          <span class="font-semibold">Suggerimento:</span> Alert chiaro per
          suggerimenti discreti.
        </div>
      </div>
    </div>
  </div>
</template>
