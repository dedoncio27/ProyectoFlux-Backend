const exercises = [

    { "id": "EX-10001", "name": "Press de banca con barra", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Bench_press.jpg/440px-Bench_press.jpg" },
    { "id": "EX-10002", "name": "Press de banca inclinado", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Incline_bench_press.jpg/440px-Incline_bench_press.jpg" },
    { "id": "EX-10003", "name": "Aperturas con mancuernas", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dumbbell_flyes.jpg/440px-Dumbbell_flyes.jpg" },
    { "id": "EX-10004", "name": "Fondos en paralelas", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tricep_dips.jpg/440px-Tricep_dips.jpg" },
    { "id": "EX-10005", "name": "Cruces en polea alta", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cable_crossover.jpg/440px-Cable_crossover.jpg" },
    { "id": "EX-10006", "name": "Press de banca con mancuernas", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Dumbbell_bench_press.jpg/440px-Dumbbell_bench_press.jpg" },
    { "id": "EX-10007", "name": "Pullover con mancuerna", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dumbbell_pullover.jpg/440px-Dumbbell_pullover.jpg" },
    { "id": "EX-10008", "name": "Flexiones (push-ups)", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Push-up.jpg/440px-Push-up.jpg" },
    { "id": "EX-10009", "name": "Press de banca declinado", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Decline_bench_press.jpg/440px-Decline_bench_press.jpg" },
    { "id": "EX-10010", "name": "Aperturas en banco inclinado", "muscle_group": "Pectoral", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Incline_dumbbell_fly.jpg/440px-Incline_dumbbell_fly.jpg" },


    { "id": "EX-10101", "name": "Dominadas (pull-ups)", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pull-up.jpg/440px-Pull-up.jpg" },
    { "id": "EX-10102", "name": "Remo con barra", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Bent_over_row.jpg/440px-Bent_over_row.jpg" },
    { "id": "EX-10103", "name": "Remo con mancuerna", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/One_arm_dumbbell_row.jpg/440px-One_arm_dumbbell_row.jpg" },
    { "id": "EX-10104", "name": "Peso muerto", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Deadlift.jpg/440px-Deadlift.jpg" },
    { "id": "EX-10105", "name": "Jalón al pecho", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lat_pulldown.jpg/440px-Lat_pulldown.jpg" },
    { "id": "EX-10106", "name": "Remo en máquina", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Seated_cable_row.jpg/440px-Seated_cable_row.jpg" },
    { "id": "EX-10107", "name": "Hiperextensiones", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Back_extension.jpg/440px-Back_extension.jpg" },
    { "id": "EX-10108", "name": "Pullover con barra", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Barbell_pullover.jpg/440px-Barbell_pullover.jpg" },
    { "id": "EX-10109", "name": "Remo T-bar", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/T_bar_row.jpg/440px-T_bar_row.jpg" },
    { "id": "EX-10110", "name": "Face pull", "muscle_group": "Espalda", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Face_pull.jpg/440px-Face_pull.jpg" },


    { "id": "EX-10201", "name": "Press militar con barra", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Overhead_press.jpg/440px-Overhead_press.jpg" },
    { "id": "EX-10202", "name": "Elevaciones laterales", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Lateral_raise.jpg/440px-Lateral_raise.jpg" },
    { "id": "EX-10203", "name": "Elevaciones frontales", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Front_raise.jpg/440px-Front_raise.jpg" },
    { "id": "EX-10204", "name": "Pájaro (elevaciones posteriores)", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Rear_delt_fly.jpg/440px-Rear_delt_fly.jpg" },
    { "id": "EX-10205", "name": "Press Arnold", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Arnold_press.jpg/440px-Arnold_press.jpg" },
    { "id": "EX-10206", "name": "Press con mancuernas sentado", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Seated_dumbbell_press.jpg/440px-Seated_dumbbell_press.jpg" },
    { "id": "EX-10207", "name": "Encogimientos con mancuernas", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Dumbbell_shrug.jpg/440px-Dumbbell_shrug.jpg" },
    { "id": "EX-10208", "name": "Face pull", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Face_pull.jpg/440px-Face_pull.jpg" },
    { "id": "EX-10209", "name": "Elevaciones laterales en polea", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Cable_lateral_raise.jpg/440px-Cable_lateral_raise.jpg" },
    { "id": "EX-10210", "name": "Press en máquina", "muscle_group": "Hombros", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Shoulder_press_machine.jpg/440px-Shoulder_press_machine.jpg" },


    { "id": "EX-10301", "name": "Curl con barra", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Barbell_curl.jpg/440px-Barbell_curl.jpg" },
    { "id": "EX-10302", "name": "Curl con mancuernas", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Dumbbell_curl.jpg/440px-Dumbbell_curl.jpg" },
    { "id": "EX-10303", "name": "Curl martillo", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Hammer_curl.jpg/440px-Hammer_curl.jpg" },
    { "id": "EX-10304", "name": "Curl concentrado", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Concentration_curl.jpg/440px-Concentration_curl.jpg" },
    { "id": "EX-10305", "name": "Curl en banco Scott", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Preacher_curl.jpg/440px-Preacher_curl.jpg" },
    { "id": "EX-10306", "name": "Curl en polea baja", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cable_curl.jpg/440px-Cable_curl.jpg" },
    { "id": "EX-10307", "name": "Curl invertido", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Reverse_curl.jpg/440px-Reverse_curl.jpg" },
    { "id": "EX-10308", "name": "Curl con barra Z", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/EZ_bar_curl.jpg/440px-EZ_bar_curl.jpg" },
    { "id": "EX-10309", "name": "Curl alterno con mancuernas", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Alternating_dumbbell_curl.jpg/440px-Alternating_dumbbell_curl.jpg" },
    { "id": "EX-10310", "name": "Curl en banco inclinado", "muscle_group": "Bíceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Incline_dumbbell_curl.jpg/440px-Incline_dumbbell_curl.jpg" },


    { "id": "EX-10401", "name": "Extensión de tríceps con polea", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Tricep_pushdown.jpg/440px-Tricep_pushdown.jpg" },
    { "id": "EX-10402", "name": "Fondos en paralelas", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tricep_dips.jpg/440px-Tricep_dips.jpg" },
    { "id": "EX-10403", "name": "Extensión de tríceps con mancuerna", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Overhead_tricep_extension.jpg/440px-Overhead_tricep_extension.jpg" },
    { "id": "EX-10404", "name": "Press francés", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Skull_crusher.jpg/440px-Skull_crusher.jpg" },
    { "id": "EX-10405", "name": "Patada de tríceps", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Tricep_kickback.jpg/440px-Tricep_kickback.jpg" },
    { "id": "EX-10406", "name": "Extensión de tríceps en polea alta", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Overhead_cable_extension.jpg/440px-Overhead_cable_extension.jpg" },
    { "id": "EX-10407", "name": "Fondos en banco", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bench_dips.jpg/440px-Bench_dips.jpg" },
    { "id": "EX-10408", "name": "Extensión de tríceps con barra Z", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/EZ_bar_extension.jpg/440px-EZ_bar_extension.jpg" },
    { "id": "EX-10409", "name": "Extensión de tríceps con mancuerna a una mano", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/One_arm_extension.jpg/440px-One_arm_extension.jpg" },
    { "id": "EX-10410", "name": "Diamond push-ups", "muscle_group": "Tríceps", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Diamond_push_up.jpg/440px-Diamond_push_up.jpg" },


    { "id": "EX-10501", "name": "Sentadilla con barra", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Back_squat.jpg/440px-Back_squat.jpg" },
    { "id": "EX-10502", "name": "Prensa de piernas", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Leg_press.jpg/440px-Leg_press.jpg" },
    { "id": "EX-10503", "name": "Zancadas", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Lunge.jpg/440px-Lunge.jpg" },
    { "id": "EX-10504", "name": "Extensión de cuádriceps", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Leg_extension.jpg/440px-Leg_extension.jpg" },
    { "id": "EX-10505", "name": "Curl femoral", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Leg_curl.jpg/440px-Leg_curl.jpg" },
    { "id": "EX-10506", "name": "Peso muerto rumano", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Romanian_deadlift.jpg/440px-Romanian_deadlift.jpg" },
    { "id": "EX-10507", "name": "Sentadilla búlgara", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bulgarian_split_squat.jpg/440px-Bulgarian_split_squat.jpg" },
    { "id": "EX-10508", "name": "Sentadilla frontal", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Front_squat.jpg/440px-Front_squat.jpg" },
    { "id": "EX-10509", "name": "Sentadilla hack", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hack_squat.jpg/440px-Hack_squat.jpg" },
    { "id": "EX-10510", "name": "Elevación de talones (gemelos)", "muscle_group": "Piernas", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Calf_raise.jpg/440px-Calf_raise.jpg" },


    { "id": "EX-10601", "name": "Crunch abdominal", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Crunch.jpg/440px-Crunch.jpg" },
    { "id": "EX-10602", "name": "Plancha (plank)", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Plank.jpg/440px-Plank.jpg" },
    { "id": "EX-10603", "name": "Elevación de piernas", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Leg_raise.jpg/440px-Leg_raise.jpg" },
    { "id": "EX-10604", "name": "Russian twist", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Russian_twist.jpg/440px-Russian_twist.jpg" },
    { "id": "EX-10605", "name": "Mountain climbers", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mountain_climber.jpg/440px-Mountain_climber.jpg" },
    { "id": "EX-10606", "name": "Bicycle crunch", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Bicycle_crunch.jpg/440px-Bicycle_crunch.jpg" },
    { "id": "EX-10607", "name": "Hollow body hold", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hollow_body.jpg/440px-Hollow_body.jpg" },
    { "id": "EX-10608", "name": "V-ups", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/V_up.jpg/440px-V_up.jpg" },
    { "id": "EX-10609", "name": "Ab wheel rollout", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ab_wheel.jpg/440px-Ab_wheel.jpg" },
    { "id": "EX-10610", "name": "Toes to bar", "muscle_group": "Abdominales", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Toes_to_bar.jpg/440px-Toes_to_bar.jpg" },


    { "id": "EX-10701", "name": "Hip thrust", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Hip_thrust.jpg/440px-Hip_thrust.jpg" },
    { "id": "EX-10702", "name": "Puente de glúteos", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Glute_bridge.jpg/440px-Glute_bridge.jpg" },
    { "id": "EX-10703", "name": "Patada de glúteo", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Glute_kickback.jpg/440px-Glute_kickback.jpg" },
    { "id": "EX-10704", "name": "Abducción de cadera", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hip_abduction.jpg/440px-Hip_abduction.jpg" },
    { "id": "EX-10705", "name": "Peso muerto sumo", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sumo_deadlift.jpg/440px-Sumo_deadlift.jpg" },
    { "id": "EX-10706", "name": "Step-ups", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Step_up.jpg/440px-Step_up.jpg" },
    { "id": "EX-10707", "name": "Sentadilla sumo", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Sumo_squat.jpg/440px-Sumo_squat.jpg" },
    { "id": "EX-10708", "name": "Good morning", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Good_morning.jpg/440px-Good_morning.jpg" },
    { "id": "EX-10709", "name": "Cable pull-through", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Cable_pull_through.jpg/440px-Cable_pull_through.jpg" },
    { "id": "EX-10710", "name": "Frog pumps", "muscle_group": "Glúteos", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Frog_pump.jpg/440px-Frog_pump.jpg" },


    { "id": "EX-10801", "name": "Carrera en cinta", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Treadmill_running.jpg/440px-Treadmill_running.jpg" },
    { "id": "EX-10802", "name": "Bicicleta estática", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Stationary_bike.jpg/440px-Stationary_bike.jpg" },
    { "id": "EX-10803", "name": "Elíptica", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Elliptical.jpg/440px-Elliptical.jpg" },
    { "id": "EX-10804", "name": "Remo (máquina)", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Rowing_machine.jpg/440px-Rowing_machine.jpg" },
    { "id": "EX-10805", "name": "Saltar la cuerda", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Jump_rope.jpg/440px-Jump_rope.jpg" },
    { "id": "EX-10806", "name": "Burpees", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Burpee.jpg/440px-Burpee.jpg" },
    { "id": "EX-10807", "name": "Escaladora (stair master)", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stair_master.jpg/440px-Stair_master.jpg" },
    { "id": "EX-10808", "name": "Box jumps", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Box_jump.jpg/440px-Box_jump.jpg" },
    { "id": "EX-10809", "name": "Battle ropes", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Battle_ropes.jpg/440px-Battle_ropes.jpg" },
    { "id": "EX-10810", "name": "Sprints", "muscle_group": "Cardio", "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sprinting.jpg/440px-Sprinting.jpg" },
]

async function seedExercises() {
    const API_URL = "https://flux-backend-e9flgx4cc-adrians-projects-3ead0681.vercel.app/";

    try {
        const res = await fetch(`${API_URL}/api/exercises`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exercises),
        });

        const data = await res.json();
        console.log(`✅ ${data.count} ejercicios subidos`);
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

seedExercises();
