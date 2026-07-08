// Placeholder product data — swap with Convex query later
export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  imageSrc: string;
  hoverImageSrc?: string;
  badge?: {
    text: string;
    type: "new" | "limited" | "soldout";
  };
}

export const curatedDrops: Product[] = [
  {
    id: "vortex-heavyweight-tee",
    name: "VORTEX HEAVYWEIGHT TEE",
    price: "Rs. 4,500",
    description: "CARBON BLACK / WASHED",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhfqJYZB_jpb-q9_SGEWk7XZ7vOH50NQPhIdZWi7MNznFsbwPgcajE6Gzbwz0usFgOK3C-qZSycVPWqU0TWpo64aQozQWRQgeezlzm--dbuWGKqYjBQaTkpHV_a6sFhknGJk5fI7YIf9jEqarpCuc8MO5ZuI6Bl5OCbad4mRRejeP09-JhEdNuKTIiJmdwvLD4rmxv-TjXjKr7-IEZ66tWMnYrAy0ZyEXHLrGDCsDMF4E_KxmzwemLwcy7jc4y1rtF4b4Y5V3QtNMo",
    hoverImageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBH8iPc6sRbMx8nNuvUESOVbx1dUhcHyE5TLCi7OqQymDAWI__6c6R2gULCxGa1VWt01qhtwD3g-zEUhqFiR617Qfrs2biln-KIrifsAcR-MWD2hbZ3M91H_FCc3IVBMqXRu8yEtdrbJzb3-2MC2vaVkfGYC6qQ8ibXn8Fv1dOMne5ei3AP1LRC8nTJ06ZOv_7pCUxYmgBGhuSBXbW8fgS0UkJhfW4Y7QjeuQd_vYg9xE0cR1DXSFxUJnLdGrRxjHFBCjN9btlGt0pQ",
    badge: { text: "NEW", type: "new" },
  },
  {
    id: "tactical-cargo-pant",
    name: "TACTICAL CARGO PANT",
    price: "Rs. 8,200",
    description: "UTILITY BLACK / NYLON",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAWNzCvl1tNjvfLt5FaT6o3dQl510GcEtL6BAs1dlTqrM9IYxh4yaMQA8yRogNE7XlMSKt93ljAeVfz_TC12eMsmKDemQpfdLYQ2_tk-iFx7boWH9UQhIXVgx8b0QoQjcNmd4_3BdjLnKKCr7Xhudxuw8JmmgSy0WiyeLKIqb0NVl9Eldgrw2xg0r_t90aAjCPrwhRhjlxQFCgYjq_j69toP0MuAojS6lL9zIloEy25kyCw0IJTjfZcgepTbNhyBK9ZzQj1-4QQ8o4y",
    hoverImageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD87tdsc60IIdWVRUCURgk81dTKigc2Nmg2jH4jVdwnnMJygbqiFCvtnDeMG9oQImIXwKRb9j3JLVxHAtn5S30VxA02RoqOTfL3ko5MtGTTuTVEU4YZAvN56_6YKOCH4lSTvdlAWlnBq0WkURG0nyx7rEhIqfFaN7lz0COEZZvKejXogd7y7H3vcM9hiY1KCBCt-bWifYUi1Q0GCv8eQrzvjT2vO3IdNHXhrEi2QankCjAPob9dJr-YBKVsztLCy9mrc6a7h_ns2Pmq",
    badge: { text: "LIMITED STOCK", type: "limited" },
  },
  {
    id: "ghost-layer-hoodie",
    name: "GHOST LAYER HOODIE",
    price: "Rs. 6,500",
    description: "STARK WHITE / REINFORCED",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB4AhUtJYrqJF_Bjuf3gZ2dupliCIItp4l5VDcH5ofdsyLsk_DxWKWqCc6-jkc9XmopJlwRE6sMUyH78pFSsT5RgT0iPyx9GPdiXc0vCceRidcOegs4bjyAia0X0vSVHNTXsvr8KK0S0PyvhM8eSkkVjqcV5fal5WiqPNUaF3-yru7TBwgQC6ROOG5UAu_hdA74ZYnIMcEeBJGAShb7nYKcHz0c6GTW55A6i1TWwrCpPEed2lpNfbeZuPXujJaYAGe3NYPaSxGeaJAk",
    hoverImageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0uo1kXMpqDs_ZB2xqUOiBAxWyDOgWekNSeM9MSkbyxq9UEKH3j0eUThmedhQ46LVrsTM3pVYjTRkcjjr-DryDiGtAYrGjK36IsN3-vEjLy2dsk6QsITqCIuAMB9mK9ZyMm_akkrl4zBqu4unWMfucUduDMc7wxFRst3Uj9aisUWWd64chhGBXHUlHpZtxRrk9Pnb95CgmoDg5TuGh7SamHtXZ9H7j2hDW8MfumHIrIOppVhjAN7pQYE37KM7fQq2ME693szuOhS6T",
  },
  {
    id: "modular-puffer-vest",
    name: "MODULAR PUFFER VEST",
    price: "Rs. 9,500",
    description: "OBSIDIAN / THERMAL",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAndPlEYnugEuVQHEF-zW1fA9XSQoxLMjtvblTRUUbA2VJ5Trzr7ZUsUFMpOOJysdk--sKexFwf7qcvfKjdNHSzBlnOCIqugJVXwWWTkBvVIWN4jdSA-RIhX4uzJdCQXhGMEswovrbjYfzJevanQ-3besLTXG5VUdCi2HxjJPgYUujkYaemPfMWYiUVTRBddhJZJVruIEwrwn3nKaFCFL3IkMPUBiCSdAvUufgC1f5Z818v4zfZzQzzLdseaij2h8xSAC-WXyEUY4a",
    badge: { text: "SOLD OUT", type: "soldout" },
  },
];
