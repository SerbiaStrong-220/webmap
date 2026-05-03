<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, scale as svelteScale } from 'svelte/transition';

    let { src, alt, onClose } = $props();

    let zoom = $state(1);
    let offsetX = $state(0);
    let offsetY = $state(0);
    let isDragging = $state(false);
    let startX = $state(0);
    let startY = $state(0);

    const zoomIn = () => zoom = Math.min(zoom + 0.25, 5);
    const zoomOut = () => zoom = Math.max(zoom - 0.25, 0.5);
    const resetZoom = () => {
        zoom = 1;
        offsetX = 0;
        offsetY = 0;
    };

    const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - offsetX;
        startY = e.clientY - offsetY;
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
    };

    const onMouseUp = () => {
        isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY;
        const zoomStep = 0.1 * zoom; // Zoom faster when already zoomed in
        if (delta < 0) {
            zoom = Math.min(zoom + zoomStep, 5);
        } else {
            zoom = Math.max(zoom - zoomStep, 0.5);
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    });
</script>

<div 
    role="button"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity overflow-hidden"
    transition:fade={{ duration: 200 }}
    onclick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    onkeydown={(e) => { if (e.key === 'Escape') onClose(); }}
>
    <!-- Close Button -->
    <button 
        class="absolute top-6 right-6 p-3 text-white/50 hover:text-white transition-all hover:scale-110 active:scale-95 z-60 bg-white/5 hover:bg-white/10 rounded-full"
        onclick={onClose}
        aria-label="Close modal"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    </button>

    <!-- Zoom Controls -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 z-60 shadow-2xl shadow-black/50">
        <button 
            class="p-2.5 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-xl"
            onclick={zoomOut}
            aria-label="Zoom out"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
        </button>
        
        <div class="h-6 w-px bg-white/10 mx-1"></div>

        <button 
            class="px-4 py-2 text-white font-semibold text-sm min-w-[80px] text-center hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            onclick={resetZoom}
            title="Reset zoom and position"
        >
            {Math.round(zoom * 100)}%
        </button>

        <div class="h-6 w-px bg-white/10 mx-1"></div>

        <button 
            class="p-2.5 text-white/70 hover:text-white transition-colors hover:bg-white/10 rounded-xl"
            onclick={zoomIn}
            aria-label="Zoom in"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
        </button>
    </div>

    <!-- Image Container -->
    <div 
        role="presentation"
        class="w-full h-full flex items-center justify-center p-12 select-none"
        onmousedown={onMouseDown}
        onwheel={onWheel}
    >
        <div class="relative flex items-center justify-center min-h-full min-w-full">
            <img 
                {src} 
                {alt} 
                draggable="false"
                class="max-w-none shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-transform duration-200 ease-out pixelated"
                class:cursor-grabbing={isDragging}
                class:cursor-grab={!isDragging}
                style="transform: translate({offsetX}px, {offsetY}px) scale({zoom});"
                transition:svelteScale={{ duration: 400, start: 0.8, opacity: 0 }}
            />
        </div>
    </div>
</div>

<style>
    :global(body) {
        overflow: hidden;
    }

    img {
        -webkit-user-drag: none;
    }
</style>
