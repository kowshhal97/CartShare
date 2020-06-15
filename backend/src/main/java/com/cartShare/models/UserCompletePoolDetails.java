package com.cartShare.models;

import java.util.List;

public class UserCompletePoolDetails {
	private PoolDeepForm poolDetails ;
	private List<PoolDeepForm> poolList ;
	private Long poolUserId ;
	private Long currentStoreId ;
	private String storeName ;
	private int contribution ;
	private String contributionStatus ;
	private Long cuurentOrderId ;
	private Long currentOrderOfaUserId ;
	public Long getCurrentStoreId() {
		return currentStoreId;
	}
	public void setCurrentStoreId(Long currentStoreId) {
		this.currentStoreId = currentStoreId;
	}
	public int getContribution() {
		return contribution;
	}
	public void setContribution(int contribution) {
		this.contribution = contribution;
	}
	public String getContributionStatus() {
		return contributionStatus;
	}
	public void setContributionStatus(String contributionStatus) {
		this.contributionStatus = contributionStatus;
	}
	public Long getCuurentOrderId() {
		return cuurentOrderId;
	}
	public void setCuurentOrderId(Long cuurentOrderId) {
		this.cuurentOrderId = cuurentOrderId;
	}
	public Long getCurrentOrderOfaUserId() {
		return currentOrderOfaUserId;
	}
	public void setCurrentOrderOfaUserId(Long currentOrderOfaUserId) {
		this.currentOrderOfaUserId = currentOrderOfaUserId;
	}
	public List<PoolDeepForm> getPoolList() {
		return poolList;
	}
	public void setPoolList(List<PoolDeepForm> poolList) {
		this.poolList = poolList;
	}
	public Long getPoolUserId() {
		return poolUserId;
	}
	public void setPoolUserId(Long poolUserId) {
		this.poolUserId = poolUserId;
	}
	public PoolDeepForm getPoolDetails() {
		return poolDetails;
	}
	public void setPoolDetails(PoolDeepForm poolDetails) {
		this.poolDetails = poolDetails;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}




}
