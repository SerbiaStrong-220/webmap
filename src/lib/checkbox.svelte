<script lang="ts">
    let { checked = $bindable() } = $props();
</script>

<style>

.checkbox {
    width: 24px;
    height: 24px;
}

</style>

<input type="checkbox" class="checkbox" bind:checked />
