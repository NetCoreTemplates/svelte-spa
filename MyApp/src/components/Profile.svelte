<script lang="ts">
  import { userSession, signout } from '../shared';
  import { AuthenticateResponse } from '../shared/dtos';
  
  let user:AuthenticateResponse = null;
  userSession.subscribe(x => user = x);
</script>

{#if user}
<div id="profile" class="text-center">
    <img src="{user.profileUrl}" class="svg-8x" alt="avatar" />
    <p class="my-2">
        {user.displayName} <span v-if="user.userId">#{user.userId}</span>
    </p>
    <p>
        {user.userName}
    </p>
    {#if user.roles}
      <p class="roles">
        {#each user.roles as x}<mark>{x}</mark>{/each}
      </p>
    {/if}
    {#if user.permissions}
      <p class="permissions">
        {#each user.permissions as x}<mark>{x}</mark>{/each}
      </p>
    {/if}
    <p>
        <button class="btn btn-primary" on:click={signout} primary>Sign Out</button>
    </p>
</div>
{/if}
