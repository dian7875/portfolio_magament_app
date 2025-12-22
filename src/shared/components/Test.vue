<template>
  <div class="grid gap-4">
    <Card
      v-for="card in cards"
      :key="card.id"
      :data="card"
      @action="handleCardAction"
    />
  </div>
</template>

<script setup lang="ts">
import toast from "vue3-hot-toast";
import type { CardActionType, CardData } from "../types/CardType";
import Card from "./Card.vue";
import { formatPeriod } from "../utils/FormatDate";

function handleCardAction({ type, id }: { type: CardActionType; id: string }) {
  switch (type) {
    case "delete":
      openDeleteModal(id);
      break;

    case "edit":
      openEditModal(id);
      break;

    case "hide":
      openHideModal(id);
      break;

    case "restore":
      openRestoreModal(id);
      break;
  }
}

const apiEducations = [
  {
    id: 1,
    institution: 'Universidad de Costa Rica',
    title: 'Ingeniería en Sistemas',
    description: 'Carrera enfocada en software...',
    startDate: '2019-01-01T00:00:00.000Z',
    endDate: '2023-12-01T00:00:00.000Z',
    finished: true,
    hidden: false,
  },
  {
    id: 2,
    institution: 'Platzi',
    title: 'Frontend Developer',
    description: null,
    startDate: '2022-05-01T00:00:00.000Z',
    endDate: null,
    finished: false,
    hidden: true,
  },
]


const cards: CardData[] = apiEducations.map((edu) => {
  const actions: CardActionType[] = edu.hidden
    ? ['edit', 'restore', 'delete']
    : ['edit', 'hide', 'delete']

  return {
    id: String(edu.id),
    title: edu.title,
    resumen: [
      edu.institution,
      formatPeriod(edu.startDate, edu.endDate, edu.finished),
      edu.finished ? 'Finalizado' : 'En curso',
    ].join(' • '),
    hidden: edu.hidden,
    actions,
  }
})

function openDeleteModal(id: string) {
  toast(`Delete modal ${id} `);
}
function openEditModal(id: string) {
  toast(`Edit modal ${id} `);
}
function openHideModal(id: string) {
  toast(`Hide modal ${id} `);
}
function openRestoreModal(id: string) {
  toast(`Restore modal ${id} `);
}
</script>
