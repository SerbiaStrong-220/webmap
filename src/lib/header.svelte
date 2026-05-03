<script lang="ts">
    import { resolve } from "$app/paths";

    import configJson from '$root/config.json' with { type: 'json' };
</script>

<style>

</style>

<div class="w-full flex flex-row justify-between panel-secondary items-center py-2 px-6.25 no-select sticky top-0">
    <div class="w-max flex flex-row gap-2.5">
        <img src={resolve("/icon-256x256.png")} class="size-10" alt="SS220" />
        <span class="h1 flex items-center">{configJson.name}</span>
    </div>
    <div class="flex flex-row gap-8">
        <a href={resolve("/")}>Главная страница</a>
        <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
        <a href={configJson.wiki_url}>WIKI</a>
    </div>
</div>
