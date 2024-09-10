import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import { PublicStyles } from "../../styles/PublicStyles";
import { useNavigation } from "@react-navigation/native";
import ServiceSkeleton from "../../components/skeletons/ServiceSkeleton";
import { ServicesContextData } from "../../ContextData/ServicesContext";
import BackendData from "../../utilities/BackendData";
import { AuthContextData } from "../../ContextData/AuthContext";
import { useTranslation } from "react-i18next";
import ServiceItem from "./ItemsComponents/ServiceItem";

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [services, fetchServicesData, ,] = useContext(ServicesContextData);
  const [auth, setAuth] = useContext(AuthContextData);
  const [filteredServices, setFilteredServices] = useState([]);
  const { t } = useTranslation();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchServicesData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filterserviceByBranch = () => {
    if (services && auth) {
      const result = services.filter(
        (service) => service.branch.name === auth.branch
      );
      setFilteredServices(result);
    }
  };

  useEffect(() => {
    fetchServicesData();
    filterserviceByBranch();
  }, [auth, services]);

  return (
    <ScrollView
      style={PublicStyles.screen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text
          style={[
            PublicStyles.screenTitle,
            { marginTop: 50, marginBottom: 50 },
          ]}
        >
          {t("services")}
        </Text>
        <View
          style={[
            PublicStyles.row,
            PublicStyles.justifyBetween,
            styles.servicesContainer,
            PublicStyles.container,
            { paddingBottom: 100},
          ]}
        >
          {services && services.length > 0 ? (
            <>
              {services.map((item) => (
                <ServiceItem key={item.id} onpress={()=>navigation.navigate("ServiceWorkers", { id: item.id })} name={item.name} image={`${BackendData.url2}uploads/service/${item.image}`} />
              ))}
            </>
          ) : (
            <View
              style={[
                PublicStyles.row,
                PublicStyles.justifyBetween,
                styles.servicesContainer,
                PublicStyles.container,
              ]}
            >
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
              <ServiceSkeleton />
            </View>
          )}
        </View>
      </View>
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  servicesContainer: {
    flexWrap: "wrap",
  },
  btn: {
    width: "30%",
    borderWidth: 1,
    borderColor: PublicStyles.lightColor,
    margin: 5,
    padding: 10,
    borderRadius: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
