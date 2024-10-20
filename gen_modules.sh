### DO NOT USE THIS, IT RESETS THE MODULES

modules=("user" "cookbook" "recipe" "commununity" "comment" "permission")

for module in "${modules[@]}"; do
  nest generate module $module
  nest generate resolver $module
  nest generate service $module
done