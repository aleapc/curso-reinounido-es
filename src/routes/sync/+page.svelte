<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import { decodeSync, importSync } from '$lib/sync';

  // 'fora' = link aberto no navegador (não no PWA instalado): no iOS o storage é
  // SEPARADO — importar aqui gravava no lugar errado e mostrava sucesso falso.
  let estado = $state<'lendo' | 'preview' | 'ok' | 'erro' | 'fora'>('lendo');
  let detalhe = $state('');
  let codigo = $state('');
  let previa = $state<{ ale: number; dea: number } | null>(null);
  let copiado = $state(false);

  onMount(() => {
    const m = window.location.hash.match(/s=(ES1.[A-Za-z0-9_-]+)/);
    if (!m) {
      estado = 'erro';
      detalhe = 'Aucun code dans ce lien. Demandez-en un nouveau.';
      return;
    }
    codigo = m[1];
    const data = decodeSync(codigo);
    if (!data) {
      estado = 'erro';
      detalhe = 'Code invalide — demandez-leur d’en générer un nouveau.';
      return;
    }
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    if (!standalone) {
      estado = 'fora';
      return;
    }
    // Dentro do app: mostra o que vai entrar e ESPERA confirmação (merge é
    // irreversível — união sem undo).
    previa = { ale: data.ale.length, dea: data.dea.length };
    estado = 'preview';
  });

  function confirmar() {
    const r = importSync(codigo);
    if (r) {
      estado = 'ok';
      detalhe = `Fusionné +${r.ale} et +${r.dea}. 🎉`;
    } else {
      estado = 'erro';
      detalhe = 'Code invalide.';
    }
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
      copiado = true;
    } catch {
      /* iOS antigo sem clipboard API — o textarea abaixo permite copiar na mão */
    }
  }
</script>

<div class="mt-10 text-center">
  {#if estado === 'lendo'}
    <p>Lecture du code…</p>
  {:else if estado === 'preview'}
    <h1 class="text-2xl font-extrabold">Synchroniser ? 🔄</h1>
    <p class="mt-2 text-carvao/70">
      Ce code contient {previa?.ale ?? 0} + {previa?.dea ?? 0} parties terminées. L’importation fusionne
      tout et ne supprime rien.
    </p>
    <button class="btn-primary mt-4" onclick={confirmar}>Importer maintenant</button>
  {:else if estado === 'ok'}
    <h1 class="text-2xl font-extrabold text-salvia">Terminé ✅</h1>
    <p role="status" class="mt-2 text-carvao/70">{detalhe}</p>
  {:else if estado === 'fora'}
    <h1 class="text-2xl font-extrabold">Presque 📲</h1>
    <p class="mx-auto mt-2 max-w-sm text-carvao/70">
      Ce lien s’est ouvert dans votre <b>navigateur</b> — mais votre progression se trouve dans l’<b>appli Cheers!</b> sur
      votre écran d’accueil. Copiez le code et collez-le là-bas :
    </p>
    <ol class="mx-auto mt-3 max-w-sm space-y-1 text-left text-sm text-carvao/70">
      <li>1. Touchez <b>Copier le code</b> ci-dessous</li>
      <li>2. Ouvrez l’appli <b>Cheers!</b> sur votre écran d’accueil (sur ordinateur : l’accueil du cours)</li>
      <li>3. Sous <b>Sync</b>, collez-le et importez</li>
    </ol>
    <button class="btn-primary mt-4" onclick={copiar}>
      {copiado ? '✅ Copié' : '📋 Copier le code'}
    </button>
    <textarea
      class="mx-auto mt-3 block w-full max-w-sm rounded-xl border border-black/10 bg-white p-2 text-[10px] text-carvao/60"
      rows="3"
      readonly
      onclick={(e) => (e.currentTarget as HTMLTextAreaElement).select()}>{codigo}</textarea
    >
  {:else}
    <h1 class="text-2xl font-extrabold text-terracota">Hmm… 🤔</h1>
    <p role="status" class="mt-2 text-carvao/70">{detalhe}</p>
  {/if}
  <a href="{base}/" class="btn-primary mt-6 inline-block">Aller au cours</a>
</div>
