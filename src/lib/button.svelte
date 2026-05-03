<script lang="ts">
    interface Props {
        text: string;
        className?: string;
        onClick?: (event: MouseEvent) => void;
    }

    let { text, className = "", onClick }: Props = $props();
</script>

<style>
.button {
    background-color: var(--secondary);
    padding-inline: 10px;
    padding-block: 5px;
    transition: background-color 0.2s ease-in-out;
}
.button:hover {
    background-color: var(--secondary-dark);
    cursor: pointer;
}
</style>

<button class="button {className}" onclick={onClick}>{text}</button>
