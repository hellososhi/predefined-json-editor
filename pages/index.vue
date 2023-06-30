<template>
  <div class="whole-wrapper">
    <div class="header">
      <h1>Predefined JSON Editor for TRAIL</h1>
      <select v-model="mode">
        <option v-for="option in options" :key="option">{{ option }}</option>
      </select>
    </div>
    <div class="main-wrapper">
      <div class="console">
        <button v-if="mode !== 'names'" @click="add">ADD</button>
        <div v-if="mode !== 'names'">
          <div v-for="(element, index) in predefinedInfo[mode]" :key="index" class="inputs">
            <input v-for="(value, key) in element" :key="key" v-model="element[key]" :placeholder="key" />
            <button @click="predefinedInfo[mode].splice(index, 1)">DELETE</button>
          </div>
        </div>
        <div v-else>
          <div>
            <div class="names-header">female: <button @click="addFemale">ADD</button><button @click="predefinedInfo.names.female.pop()">DELETE</button></div>
            <input v-for="(name, index) in predefinedInfo.names.female" :key="index" v-model="predefinedInfo.names.female[index]" class="names-input" />
          </div>
          <div>
            <div class="names-header">male: <button @click="addMale">ADD</button><button @click="predefinedInfo.names.male.pop()">DELETE</button></div>
            <input v-for="(name, index) in predefinedInfo.names.male" :key="index" v-model="predefinedInfo.names.male[index]" class="names-input" />
          </div>
        </div>
      </div>
      <div class="display">
        <button @click="copyObject">COPY</button>
        <textarea v-model="JSONText"></textarea>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Objects, Locations, Categories, Names } from "@/types/";
  const objects = ref<Objects[]>([]);
  const locations = ref<Locations[]>([]);
  const categories = ref<Categories[]>([]);
  const names = ref<Names>({
    female: [],
    male: [],
  });
  const predefinedInfo = ref({
    objects,
    locations,
    categories,
    names,
  });
  const options = ["objects", "locations", "categories", "names"];
  const mode = ref<keyof typeof predefinedInfo.value>("objects");
  const add = () => {
    if (mode.value !== "names") {
      const emptyElement = ref<Objects | Locations | Categories>();
      if (mode.value === "objects") {
        emptyElement.value = {
          name: "",
          category: "",
          prompt: "",
          grasp_option: "",
        };
      } else if (mode.value === "locations") {
        emptyElement.value = {
          name: "",
          parent: "",
        };
      } else if (mode.value === "categories") {
        emptyElement.value = {
          name: "",
          location: "",
        };
      }
      predefinedInfo.value[mode.value].push(emptyElement.value);
    }
  };
  const addFemale = () => {
    predefinedInfo.value.names.female.push("");
  };
  const addMale = () => {
    predefinedInfo.value.names.male.push("");
  };
  const JSONText = computed(() => {
    return JSON.stringify(predefinedInfo.value[mode.value], null, 2);
  });
  const copyObject = () => {
    navigator.clipboard.writeText(JSONText.value);
  };
</script>
<style lang="scss">
  body {
    margin: 0;
  }
  .whole-wrapper {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    padding: 20px 40px;
    box-sizing: border-box;
  }
  .main-wrapper {
    display: flex;
    margin-top: 24px;
    width: 100%;
    justify-content: space-around;
  }
  .console {
    width: 40%;
    .inputs {
      margin-top: 12px;
      > input {
        width: 15%;
        margin-right: 12px;
      }
    }
    .names-header > button {
      margin-left: 12px;
    }
    .names-input {
      width: 15%;
      margin-right: 12px;
    }
  }
  .display {
    width: 40%;
    resize: none;
    display: flex;
    flex-direction: column;
    button {
      width: 6em;
    }
    textarea {
      margin-top: 12px;
      height: 500px;
      resize: none;
    }
  }
</style>
